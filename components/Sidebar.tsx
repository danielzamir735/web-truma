"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Heart,
  BarChart2,
  Settings,
  HandHeart,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "לוח בקרה" },
  { href: "/dashboard/donors", icon: Users, label: "תורמים" },
  { href: "/dashboard/volunteers", icon: Heart, label: "מתנדבים" },
  { href: "/dashboard/reports", icon: BarChart2, label: "דוחות" },
  { href: "/dashboard/settings", icon: Settings, label: "הגדרות" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col bg-slate-900 text-slate-300">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-700/60 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
          <HandHeart className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">ניהול תורמים</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700/60 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
            א
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">מנהל ראשי</p>
            <p className="truncate text-xs text-slate-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
