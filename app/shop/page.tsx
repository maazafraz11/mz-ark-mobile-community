const products = [
  { name: "MZ Ark Pro", status: "$4.99", available: true, description: "Available now" },
  { name: "MZ Ark Hack", status: "Unavailable", available: false, description: "Download link is not provided" },
  { name: "MZ Sign", status: "Coming soon", available: false, description: "Coming soon" },
  { name: "MZ Legit Ark", status: "Coming soon", available: false, description: "Coming soon" },
];

export default function ShopPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-5xl px-4 py-14 md:px-8">
      <h1 className="text-center text-4xl font-black text-white md:text-5xl">Products</h1>
      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        {products.map((product) => (
          <article key={product.name} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#0d1512] p-5 transition hover:border-accent/30">
            <img src="/mz-ark-logo.svg" alt="MZ ARK logo" className="h-20 w-20 shrink-0 rounded-full object-cover" />
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white">{product.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{product.description}</p>
              <p className={`mt-2 text-sm font-semibold ${product.available ? "text-accent" : "text-slate-300"}`}>{product.status}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
