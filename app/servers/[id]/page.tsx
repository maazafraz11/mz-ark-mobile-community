import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Discord, Globe, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serverReviews, servers } from "@/lib/mock-data";

export default function ServerDetailsPage({ params }: { params: { id: string } }) {
  const server = servers.find((entry) => entry.id === params.id);

  if (!server) {
    notFound();
  }

  const reviews = serverReviews[server.id as keyof typeof serverReviews] ?? [];

  return (
    <div className="page-shell space-y-8">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" className="border-white/10 bg-transparent text-white">
          <Link href="/servers">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to discovery
          </Link>
        </Button>
        <Badge className="border-accent/30 bg-accent/10 text-accent">{server.serverType}</Badge>
      </div>

      <section className="panel overflow-hidden">
        <div className="h-52 bg-gradient-to-r from-[#1b382c] via-[#0d1815] to-[#0b130f]" />
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-xl font-black text-accent">
                {server.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="muted-label">{server.tag}</div>
                <h1 className="mt-1 text-3xl font-black text-white md:text-5xl">{server.name}</h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-accent text-slate-950 hover:bg-accent/90">Favorite</Button>
              <Button variant="outline">Join Discord</Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Region", server.region],
              ["Version", server.gameVersion],
              ["Rates", server.rates],
              ["Online", server.playerCount],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-[#101a16] p-4">
                <div className="muted-label">{label}</div>
                <div className="mt-2 text-lg font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-accent">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">Server summary</span>
              </div>
              <p className="text-base leading-7 text-slate-300">{server.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Rules</div>
              <ul className="space-y-3 text-slate-300">
                {server.rules.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Reviews</div>
                <div className="flex items-center gap-2 text-amber-300">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium text-white">{server.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-white/10 bg-[#101a16] p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-white">{review.author}</div>
                      <div className="flex items-center gap-1 text-amber-300">
                        {Array.from({ length: review.rating }, (_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{review.message}</p>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{review.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="muted-label">Connect</div>
              <div className="space-y-3 text-sm text-slate-300">
                <a href={server.discord} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101a16] p-3">
                  <Discord className="h-4 w-4 text-accent" />
                  Discord invite
                </a>
                <a href={server.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101a16] p-3">
                  <Globe className="h-4 w-4 text-accent" />
                  Official website
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="muted-label">Fast facts</div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101a16] p-3">
                  <span>Category</span>
                  <span className="font-semibold text-white">{server.category}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101a16] p-3">
                  <span>Approval</span>
                  <span className="font-semibold text-sea">Verified</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101a16] p-3">
                  <span>Favorites</span>
                  <span className="font-semibold text-white">1,287</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
