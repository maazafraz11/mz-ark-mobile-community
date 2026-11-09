import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <div className="page-shell flex items-center justify-center">
      <div className="panel w-full max-w-lg p-6 md:p-8">
        <div className="mb-6">
          <div className="muted-label">Join the platform</div>
          <h1 className="mt-2 text-3xl font-black text-white">Register as server owner</h1>
        </div>

        <form className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="Aiden" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Valen" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a secure password" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="serverName">Server name</Label>
            <Input id="serverName" placeholder="Legacy ARK" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full bg-accent text-slate-950 hover:bg-accent/90">
              Create account
            </Button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm text-slate-300">
          Already have an account? <Link href="/auth/login" className="text-accent hover:text-accent/80">Log in</Link>
        </div>
      </div>
    </div>
  );
}
