import Link from "next/link";
import { BarChart3, Bell, Building2, ClipboardList, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Visible traffic", value: "14.2K", icon: BarChart3 },
  { label: "Favorites", value: "366", icon: Users },
  { label: "Reviews", value: "48", icon: ClipboardList },
  { label: "Warnings", value: "2", icon: Bell },
];

const navItems = [
  { icon: Building2, label: "Overview" },
  { icon: ClipboardList, label: "My Servers" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Community" },
  { icon: Shield, label: "Settings" },
];

export default function OwnerDashboardPage() {
  return (
    <div className="page-shell">
      <div className="panel overflow-hidden">
        <div className="flex flex-col border-b border-white/10 lg:flex-row">
          <aside className="w-full border-b border-white/10 bg-[#101a16] p-5 lg:w-72 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 font-black text-accent">MZ</div>
              <div>
                <div className="text-sm font-bold text-white">MZ ARK</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Owner console</div>
              </div>
            </div>

            <nav className="mt-8 space-y-2">
              {navItems.map(({ icon: Icon, label }) => (
                <button key={label} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-left text-sm text-slate-200 hover:bg-accent/5">
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="muted-label">Dashboard</div>
                <h1 className="mt-2 text-3xl font-black text-white">Overview</h1>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="border-accent/30 bg-accent/10 text-accent">Verified owner</Badge>
                <Button asChild className="bg-accent text-slate-950 hover:bg-accent/90">
                  <Link href="/owners/setup">Create server</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-[#101a16] p-4">
                  <div className="flex items-center justify-between">
                    <div className="muted-label">{label}</div>
                    <div className="rounded-lg bg-accent/10 p-2 text-accent"><Icon className="h-4 w-4" /></div>
                  </div>
                  <div className="mt-4 text-3xl font-black text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-2xl border border-white/10 bg-[#101a16] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-semibold text-white">Weekly activity</div>
                  <div className="text-sm text-slate-400">Last 7 days</div>
                </div>
                <div className="flex h-52 items-end gap-3">
                  {[30, 45, 33, 58, 66, 75, 92].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-accent/80 to-accent/40" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#101a16] p-4">
                <div className="font-semibold text-white">Recent reviews</div>
                <div className="mt-5 space-y-3">
                  {[
                    "Clean raid structure and helpful admin team.",
                    "Excellent progression system with good moderation.",
                    "Stable PvE and welcoming community.",
                  ].map((review) => (
                    <div key={review} className="rounded-xl border border-white/10 bg-[#0d1512] p-3 text-sm text-slate-300">
                      “{review}”
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
