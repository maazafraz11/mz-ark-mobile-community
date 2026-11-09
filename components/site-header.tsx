import Link from "next/link";
import { Bell, Compass, LayoutDashboard, PanelLeft, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/servers", label: "Server Discovery" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/support", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b09]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-sm font-black text-accent">
            MZ
          </div>
          <div>
            <div className="text-lg font-black tracking-[0.16em] text-white">MZ ARK</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Mobile</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-[#0f1713] px-3 py-2 text-sm text-slate-300 md:flex">
            <Compass className="h-4 w-4 text-accent" />
            <span>Community atlas</span>
          </div>
          <Button asChild variant="outline" size="sm" className="border-accent/40 bg-accent/5 text-accent">
            <Link href="/auth/login">Owners Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
