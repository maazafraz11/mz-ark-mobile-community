import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="page-shell flex items-center justify-center">
      <div className="panel w-full max-w-md p-6 md:p-8">
        <div className="mb-6">
          <div className="muted-label">Owner access</div>
          <h1 className="mt-2 text-3xl font-black text-white">Login</h1>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full bg-accent text-slate-950 hover:bg-accent/90">
            Sign in
          </Button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
          <Link href="/auth/register" className="text-accent hover:text-accent/80">Create account</Link>
          <Link href="/" className="text-slate-400 hover:text-white">Back home</Link>
        </div>
      </div>
    </div>
  );
}
