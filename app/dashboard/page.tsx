import { Users, Heart, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    label: "סה״כ תורמים",
    value: "1,284",
    change: "+12%",
    positive: true,
    sub: "מהחודש שעבר",
    icon: Users,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "תרומות החודש",
    value: "₪48,350",
    change: "+8%",
    positive: true,
    sub: "מהחודש שעבר",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "מתנדבים פעילים",
    value: "156",
    change: "-3%",
    positive: false,
    sub: "מהחודש שעבר",
    icon: Heart,
    color: "bg-rose-50 text-rose-600",
  },
  {
    label: "אירועים קרובים",
    value: "7",
    change: "+2",
    positive: true,
    sub: "אירועים החודש",
    icon: Calendar,
    color: "bg-amber-50 text-amber-600",
  },
];

const recentDonors = [
  { name: "ישראל ישראלי", amount: "₪5,000", date: "25/02/2026", type: "חד פעמי", status: "הושלם" },
  { name: "שרה כהן", amount: "₪1,200", date: "24/02/2026", type: "חודשי", status: "הושלם" },
  { name: "דוד לוי", amount: "₪3,500", date: "23/02/2026", type: "חד פעמי", status: "ממתין" },
  { name: "רחל מזרחי", amount: "₪800", date: "22/02/2026", type: "חודשי", status: "הושלם" },
  { name: "משה אברהם", amount: "₪10,000", date: "21/02/2026", type: "שנתי", status: "הושלם" },
];

const statusClass: Record<string, string> = {
  הושלם: "bg-emerald-50 text-emerald-700",
  ממתין: "bg-amber-50 text-amber-700",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, positive, sub, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-start justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <div className="space-y-1">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <div className="flex items-center gap-1 text-xs">
                {positive ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-rose-500" />
                )}
                <span className={positive ? "text-emerald-600" : "text-rose-600"}>
                  {change}
                </span>
                <span className="text-slate-400">{sub}</span>
              </div>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Donors Table */}
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">תורמים אחרונים</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            הצג הכל
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-6 py-3">שם</th>
                <th className="px-6 py-3">סכום</th>
                <th className="px-6 py-3">תאריך</th>
                <th className="px-6 py-3">סוג</th>
                <th className="px-6 py-3">סטטוס</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentDonors.map((donor) => (
                <tr key={donor.name} className="hover:bg-slate-50/60">
                  <td className="px-6 py-4 font-medium text-slate-800">{donor.name}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{donor.amount}</td>
                  <td className="px-6 py-4 text-slate-500">{donor.date}</td>
                  <td className="px-6 py-4 text-slate-500">{donor.type}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass[donor.status]}`}>
                      {donor.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
