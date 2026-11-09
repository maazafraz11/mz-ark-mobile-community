import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Swords, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServerCard } from "@/components/server-card";
import { servers, featuredServer } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 md:px-8 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Badge className="mb-6 border-accent/30 bg-accent/10 text-accent">THE LEGACY NEVER DIES</Badge>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Discover the best MZ ARK Mobile communities.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              A refined platform where players find trustworthy servers, owners manage listings, and communities thrive with polished discovery tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent text-slate-950 hover:bg-accent/90">
                <Link href="/servers">Browse Servers <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/owners/dashboard">Owner Dashboard</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
              {[
                ["2,500+", "Players"],
                ["180", "Servers"],
                ["4.9/5", "Community rating"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-card/80 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black text-accent">{value}</div>
                  <div className="text-sm text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-accent/20 bg-card/90 p-5 shadow-glow">
            <div className="rounded-2xl border border-white/10 bg-[#0a120f] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Featured server</p>
                  <h3 className="mt-2 text-2xl font-black">{featuredServer.name}</h3>
                </div>
                <Badge className="bg-accent text-slate-950">Featured</Badge>
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#1b382c] via-[#0d1815] to-[#0a0d0d] p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{featuredServer.region}</span>
                  <span>{featuredServer.gameVersion}</span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-4xl font-black text-white">{featuredServer.rates}</div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Rates</div>
                  </div>
                  <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
                    {featuredServer.pvp ? "PvP" : "PvE"}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101a16] px-3 py-2">
                  <span>Players online</span>
                  <span className="font-semibold text-white">{featuredServer.playerCount}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101a16] px-3 py-2">
                  <span>Best for</span>
                  <span className="font-semibold text-white">High-tier raiding</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101a16] px-3 py-2">
                  <span>Approval status</span>
                  <span className="font-semibold text-sea">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Popular servers</p>
            <h2 className="mt-2 text-3xl font-black text-white">Top picks for your next run</h2>
          </div>
          <Link href="/servers" className="text-sm font-medium text-accent hover:text-accent/80">
            View all servers →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servers.slice(0, 3).map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-card/70 p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Why players stay</p>
              <h3 className="mt-2 text-3xl font-black text-white">Built for the ARK Mobile community</h3>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Swords, title: "Discovery-first", text: "Search, filter and compare communities by gameplay style and region." },
              { icon: ShieldCheck, title: "Trust & moderation", text: "Verified listings, review moderation and real ownership claims." },
              { icon: TrendingUp, title: "Growth analytics", text: "Owners see engagement, views and favorites from real stored events." },
              { icon: Sparkles, title: "Premium presentation", text: "Elegant public profiles with banners, rules, community updates and links." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-[#101a16] p-5">
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <p className="mt-2 text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
