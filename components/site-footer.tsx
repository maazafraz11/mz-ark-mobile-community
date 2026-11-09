import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070b09]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8 lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-sm font-black text-accent">MZ</div>
            <div>
              <div className="text-lg font-black tracking-[0.16em] text-white">MZ ARK</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Mobile</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-300">The legacy never dies. Built for original ARK Mobile players and responsible server owners.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Explore</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li><Link href="/servers">Server Discovery</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Support</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li><Link href="/support">Help Center</Link></li>
            <li><Link href="/auth/register">Register as owner</Link></li>
            <li><Link href="/owners/dashboard">Dashboard</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
