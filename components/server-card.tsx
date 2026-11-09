import Link from "next/link";
import { ArrowUpRight, Shield, Star, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Server } from "@/lib/types";

export function ServerCard({ server }: { server: Server }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0d1512] shadow-glow transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="h-40 bg-gradient-to-r from-[#1b3829] via-[#101d18] to-[#0b120f] p-4">
        <div className="flex h-full items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-lg font-black text-accent">
              {server.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-bold text-white">{server.name}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{server.tag}</div>
            </div>
          </div>
          {server.featured ? <Badge className="bg-accent text-slate-950">Featured</Badge> : null}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
          <span>{server.region}</span>
          <span>{server.serverType}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-white">{server.rates}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Rates</div>
          </div>
          <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {server.playerCount}
          </div>
        </div>

        <p className="text-sm text-slate-300">{server.description}</p>

        <div className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center gap-1 text-amber-300">
            <Star className="h-4 w-4 fill-current" />
            <span>{server.rating}</span>
          </div>
          <span>{server.reviews} reviews</span>
        </div>

        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
          <Swords className="h-3.5 w-3.5" />
          <span>{server.category}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Shield className="h-4 w-4 text-sea" />
            <span>{server.status}</span>
          </div>
          <Button asChild variant="outline" size="sm" className="border-accent/40 bg-accent/5 text-accent">
            <Link href={`/servers/${server.id}`}>
              View server <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
