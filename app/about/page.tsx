import { ShieldCheck, Users, Zap } from "lucide-react";

const pillars = [
  { icon: Users, title: "Community-first", text: "Dedicated to original ARK Mobile players and wholesome server culture." },
  { icon: ShieldCheck, title: "Verified trust", text: "Owner claims, review moderation and public verification tools." },
  { icon: Zap, title: "Built for growth", text: "A platform designed to empower server owners and spotlight strong communities." },
];

export default function AboutPage() {
  return (
    <div className="page-shell space-y-8">
      <div>
        <div className="muted-label">About MZ ARK MOBILE</div>
        <h1 className="mt-2 text-4xl font-black text-white">The legacy never dies — and neither does the community.</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }) => (
          <div key={title} className="panel p-6">
            <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
          </div>
        ))}
      </div>

      <div className="panel p-6 md:p-8">
        <p className="text-lg leading-8 text-slate-300">
          MZ ARK MOBILE exists to connect players with the servers, crews, and experiences that best match how they want to play. We help owners manage a polished public profile while giving players transparent discovery tools, community-driven recommendations and safe moderation standards.
        </p>
      </div>
    </div>
  );
}
