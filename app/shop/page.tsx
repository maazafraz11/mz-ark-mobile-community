const products = [
  { name: "MZ Ark Pro", status: "$4.99", description: "Available now" },
  { name: "MZ Ark Hack", status: "Download ARK Mobile", description: "ARK Mobile download", href: "https://drive.google.com/file/d/1xCOMH21Hr1jgsV3qJ0YznMF_2wmvA6IV/view" },
  { name: "MZ Sign", status: "Coming soon", description: "Coming soon" },
  { name: "MZ Legit Ark", status: "Coming soon", description: "Coming soon" },
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
              {product.href ? (
                <a className="mt-2 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline" href={product.href} target="_blank" rel="noopener noreferrer">
                  {product.status}
                </a>
              ) : (
                <p className="mt-2 text-sm font-semibold text-slate-300">{product.status}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
