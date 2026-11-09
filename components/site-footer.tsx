import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070b09]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-400 sm:flex-row md:px-8">
        <Link href="/" className="flex items-center gap-2 text-white">
          <img src="/mz-ark-logo.svg" alt="" className="h-8 w-8 rounded-full" />
          <span className="font-semibold tracking-wider">MZ ARK MOBILE</span>
        </Link>
        <p>THE LEGACY NEVER DIES</p>
        <Link href="/shop" className="transition hover:text-accent">Shop</Link>
      </div>
    </footer>
  );
}
