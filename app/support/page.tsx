import Link from "next/link";
import { ChevronDown, Headset, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  { q: "How do I claim my server listing?", a: "Register as a server owner, complete the onboarding flow, and request moderation to verify claim details." },
  { q: "Can I publish server updates?", a: "Yes — owners can post announcements, update banners and rules, and manage community communications from the dashboard." },
  { q: "What data is shown publicly?", a: "Public visibility includes verified details, listing status, reviews, community notes and latest server announcements." },
];

export default function SupportPage() {
  return (
    <div className="page-shell space-y-8">
      <div>
        <div className="muted-label">Support</div>
        <h1 className="mt-2 text-4xl font-black text-white">Helpful guidance for players and owners</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="panel p-6">
          <Headset className="h-5 w-5 text-accent" />
          <h3 className="mt-4 text-xl font-bold text-white">Player help</h3>
          <p className="mt-3 text-sm text-slate-300">Need help finding a server or reporting a listing? We’ve got guidance for discovery and moderation.</p>
        </div>
        <div className="panel p-6">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <h3 className="mt-4 text-xl font-bold text-white">Owner support</h3>
          <p className="mt-3 text-sm text-slate-300">We help owners set up pages, manage staff and improve listing quality before public launch.</p>
        </div>
        <div className="panel p-6">
          <MessageSquare className="h-5 w-5 text-accent" />
          <h3 className="mt-4 text-xl font-bold text-white">Community moderation</h3>
          <p className="mt-3 text-sm text-slate-300">Need to report concerns or get assistance with server reviews? Our moderation channels are ready.</p>
        </div>
      </div>

      <div className="panel p-6 md:p-8">
        <div className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">FAQ</div>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-white/10 bg-[#101a16] p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="font-semibold text-white">{item.q}</div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
              <p className="mt-3 text-sm text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button asChild className="bg-accent text-slate-950 hover:bg-accent/90">
          <Link href="/auth/register">Request owner access</Link>
        </Button>
      </div>
    </div>
  );
}
