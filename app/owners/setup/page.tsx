import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OwnerSetupPage() {
  return (
    <div className="page-shell max-w-4xl">
      <div className="panel p-6 md:p-8">
        <div className="mb-8">
          <div className="muted-label">Owner onboarding</div>
          <h1 className="mt-2 text-4xl font-black text-white">Create your server listing</h1>
        </div>

        <form className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="serverName">Server name</Label>
            <Input id="serverName" placeholder="Legacy ARK" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="version">Game version</Label>
            <Input id="version" placeholder="ARK Mobile 2.8" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input id="region" placeholder="NA East" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Gameplay type</Label>
            <Input id="type" placeholder="PvP / PvE" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="rates">Rates</Label>
            <Input id="rates" placeholder="5x / 3x / 2x" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Tell players about your world, rules, and experience." />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="rules">Rules</Label>
            <Textarea id="rules" placeholder="List the most important rules for your community." />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="discord">Discord invite</Label>
            <Input id="discord" placeholder="https://discord.gg/yourserver" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="https://" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="banner">Banner URL</Label>
            <Input id="banner" placeholder="https://..." />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <Button type="submit" className="flex-1 bg-accent text-slate-950 hover:bg-accent/90">Save draft</Button>
            <Button asChild variant="outline" className="flex-1 border-accent/40 text-white">
              <Link href="/owners/dashboard">Submit for review</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
