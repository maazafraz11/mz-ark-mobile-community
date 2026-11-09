import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/servers", label: "Servers" },
    { href: "/shop", label: "Shop" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b09]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" aria-label="MZ ARK MOBILE home" className="flex items-center gap-3">
          <img src="/mz-ark-logo.svg" alt="MZ ARK logo" className="h-12 w-12 rounded-full object-cover" />
          <span className="text-sm font-bold tracking-[0.16em] text-white sm:text-base">MZ ARK MOBILE</span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-5">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-accent">{link.label}</Link>)}
          <Button asChild variant="outline" size="sm" className="hidden border-accent/40 text-accent sm:inline-flex"><Link href="/auth/login">Login</Link></Button>
        </nav>
      </div>
    </header>
  );
}
