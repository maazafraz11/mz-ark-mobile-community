import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Filter, Search, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServerCard } from "@/components/server-card";
import { servers } from "@/lib/mock-data";

export default function ServerDiscoveryPage() {
  return (
    <div className="page-shell space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="muted-label">Server directory</div>
          <h1 className="mt-2 text-4xl font-black text-white">Discover the right ARK Mobile community</h1>
        </div>
        <Button asChild className="bg-accent text-slate-950 hover:bg-accent/90">
          <Link href="/owners/setup">Register your server</Link>
        </Button>
      </div>

      <section className="panel p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-[1.4fr_0.9fr_0.7fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9" placeholder="Search servers, tags, regions..." aria-label="Search servers" />
          </div>
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9" placeholder="Filter by region" aria-label="Filter by region" />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101a16] px-3">
            <span className="text-sm text-slate-400">Sort:</span>
            <select className="h-11 w-full bg-transparent text-sm text-white outline-none" aria-label="Sort servers">
              <option className="bg-[#101a16]">Featured</option>
              <option className="bg-[#101a16]">Highest rating</option>
              <option className="bg-[#101a16]">Newest</option>
            </select>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["PvP", "High combat"],
          ["PvE", "Relaxed play"],
          ["Raid", "Clan pressure"],
          ["Base building", "Creative builds"],
        ].map(([label, desc]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#101a16] p-4">
            <div className="text-lg font-bold text-white">{label}</div>
            <div className="text-sm text-slate-300">{desc}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
}
