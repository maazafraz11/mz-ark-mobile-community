import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const products = [
  { name: "MZ Premium Listing", price: "$15", blurb: "Featured placement for one month with sponsor tag." },
  { name: "Owner Pack", price: "$29", blurb: "Priority support, analytics insights and listing optimization." },
  { name: "Community Boost", price: "$49", blurb: "Campaign spotlight and server announcement amplification." },
];

export default function ShopPage() {
  return (
    <div className="page-shell space-y-8">
      <div>
        <div className="muted-label">Shop</div>
        <h1 className="mt-2 text-4xl font-black text-white">Support the platform and grow your community</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.name} className="panel p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-white">{product.name}</div>
              <Badge className="border-accent/30 bg-accent/10 text-accent">Popular</Badge>
            </div>
            <div className="mt-6 text-3xl font-black text-white">{product.price}</div>
            <p className="mt-3 text-sm text-slate-300">{product.blurb}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Priority visibility</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Listing management help</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Member growth tools</li>
            </ul>
            <Button className="mt-6 w-full bg-accent text-slate-950 hover:bg-accent/90">
              Buy now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
