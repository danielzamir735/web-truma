-- ============================================================
-- Migration: 00001_init_schema.sql
-- Description: Core multi-tenant schema with RLS
-- ============================================================

-- ──────────────────────────────────────────
-- 1. TENANTS
-- ──────────────────────────────────────────
CREATE TABLE tenants (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- 2. DYNAMIC RECORDS
--    Holds donors, volunteers, or any future
--    record type for any tenant.
-- ──────────────────────────────────────────
CREATE TABLE dynamic_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  record_type VARCHAR(50) NOT NULL,          -- e.g. 'donor', 'volunteer'
  custom_data JSONB NOT NULL DEFAULT '{}',   -- flexible columns per tenant
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast per-tenant + per-type queries
CREATE INDEX idx_dynamic_records_tenant_type
  ON dynamic_records(tenant_id, record_type);

-- Index for JSONB full-text / key lookups
CREATE INDEX idx_dynamic_records_custom_data
  ON dynamic_records USING GIN(custom_data);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_dynamic_records_updated_at
  BEFORE UPDATE ON dynamic_records
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ──────────────────────────────────────────
-- 3. ROW LEVEL SECURITY
-- ──────────────────────────────────────────

-- Enable RLS on both tables
ALTER TABLE tenants        ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_records ENABLE ROW LEVEL SECURITY;

-- Helper: extract tenant_id from the JWT claims
-- Supabase stores custom claims in auth.jwt() -> app_metadata
CREATE OR REPLACE FUNCTION auth_tenant_id()
RETURNS UUID LANGUAGE sql STABLE AS $$
  SELECT (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::UUID;
$$;

-- tenants: a user may only see their own tenant row
CREATE POLICY "tenants: select own"
  ON tenants FOR SELECT
  USING (id = auth_tenant_id());

-- dynamic_records: full CRUD scoped to the user's tenant
CREATE POLICY "records: select own tenant"
  ON dynamic_records FOR SELECT
  USING (tenant_id = auth_tenant_id());

CREATE POLICY "records: insert own tenant"
  ON dynamic_records FOR INSERT
  WITH CHECK (tenant_id = auth_tenant_id());

CREATE POLICY "records: update own tenant"
  ON dynamic_records FOR UPDATE
  USING      (tenant_id = auth_tenant_id())
  WITH CHECK (tenant_id = auth_tenant_id());

CREATE POLICY "records: delete own tenant"
  ON dynamic_records FOR DELETE
  USING (tenant_id = auth_tenant_id());
