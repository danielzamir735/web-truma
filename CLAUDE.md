# Project Rules

## 1. Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend/DB:** Supabase

## 2. Language & Layout
- The application UI is **entirely in Hebrew**.
- **ALWAYS** use RTL (Right-to-Left) layout: `dir="rtl"` and `lang="he"` on the root HTML element.
- Use proper Hebrew fonts and configuration throughout the app.

## 3. Database
- Always use the **Supabase CLI** for database architecture and migrations.
- Never modify the database schema directly — use migration files.

## 4. Workflow
- Work **phase-by-phase**. Do not write massive amounts of code at once.
- **Explain your plan and ask for approval** before proceeding to the next step.

## 5. Context Management
- After completing major features, remind the user to run `/compact` or `/clear` to save tokens.
