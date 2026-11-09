import { AlertTriangle, CheckCircle2, Search, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const approvals = [
  { status: "Pending", name: "Legacy ARK", tag: "Claim review" },
  { status: "Approved", name: "Forge Warden", tag: "Featured" },
  { status: "Flagged", name: "Ashen Crown", tag: "Awaiting moderation" },
];

export default function AdminPage() {
  return (
    <div className="page-shell space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="muted-label">Platform admin</div>
          <h1 className="mt-2 text-4xl font-black text-white">Moderation and approvals</h1>
        </div>
        <Button className="bg-accent text-slate-950 hover:bg-accent/90">Review queue</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5"><div className="muted-label">Pending claims</div><div className="mt-4 text-3xl font-black text-white">28</div></div>
        <div className="panel p-5"><div className="muted-label">Active reports</div><div className="mt-4 text-3xl font-black text-white">7</div></div>
        <div className="panel p-5"><div className="muted-label">Featured servers</div><div className="mt-4 text-3xl font-black text-white">12</div></div>
      </div>

      <div className="panel overflow-hidden">
        <div className="border-b border-white/10 p-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Queue</div>
        <div className="divide-y divide-white/10">
          {approvals.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="font-semibold text-white">{item.name}</div>
                <div className="text-sm text-slate-400">{item.tag}</div>
              </div>
              <div className="flex items-center gap-3">
                {item.status === "Approved" ? <CheckCircle2 className="h-5 w-5 text-sea" /> : item.status === "Flagged" ? <AlertTriangle className="h-5 w-5 text-amber-300" /> : <Search className="h-5 w-5 text-accent" />}
                <span className="text-sm text-slate-300">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
