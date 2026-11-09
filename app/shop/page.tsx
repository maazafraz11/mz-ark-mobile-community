import Link from "next/link";
import { Button } from "@/components/ui/button";

const products = ["MZ Ark Pro", "MZ Ark Hack", "MZ Sign"];

export default function ShopPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-5xl px-4 py-16 md:px-8">
      <h1 className="text-center text-4xl font-black text-white md:text-5xl">Shop</h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product} className="flex min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1512] p-6 text-center transition hover:border-accent/40">
            <h2 className="text-2xl font-bold text-white">{product}</h2>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-400">Product information and availability coming soon.</p>
    </main>
  );
}
