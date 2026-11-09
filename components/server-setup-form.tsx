"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,70);
export function ServerSetupForm() {
  const [busy,setBusy] = useState(false); const [error,setError] = useState(""); const [notice,setNotice] = useState(""); const router=useRouter();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true);setError("");setNotice("");
    const data=new FormData(e.currentTarget); const supabase=createClient();
    if(!supabase){setError("Configure Supabase in .env.local before creating a listing.");setBusy(false);return;}
    const {data:{user},error:authError}=await supabase.auth.getUser();
    if(authError||!user){setError("Please sign in again before saving this listing.");setBusy(false);return;}
    const name=String(data.get("name")??"").trim();
    const urlField=(key:string)=>{const value=String(data.get(key)??"").trim();return value||null;};
    const rules=String(data.get("rules")??"").split("\n").map(x=>x.trim()).filter(Boolean).slice(0,30);
    const {error:insertError}=await supabase.from("servers").insert({
      owner_id:user.id,name,slug:`${slugify(name)}-${crypto.randomUUID().slice(0,6)}`,
      game_version:String(data.get("game_version")??"").trim(),region:String(data.get("region")??"").trim(),
      gameplay_type:String(data.get("gameplay_type")??"PvE"),rates:String(data.get("rates")??"").trim(),
      description:String(data.get("description")??"").trim(),rules,discord_invite:urlField("discord_invite"),website:urlField("website"),
      connection_instructions:String(data.get("connection_instructions")??"").trim()||null,
      banner_url:urlField("banner_url"),logo_url:urlField("logo_url"),status:String(data.get("action"))==="submit"?"pending":"draft"
    });
    if(insertError){setError(insertError.message);setBusy(false);return;}
    setNotice("Listing saved. Submitted listings remain private until moderation approves them."); setBusy(false); router.push("/owners/dashboard");router.refresh();
  }
  return <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
    <div className="space-y-2"><Label htmlFor="name">Server name *</Label><Input id="name" name="name" required minLength={2} maxLength={80}/></div>
    <div className="space-y-2"><Label htmlFor="game_version">Game version *</Label><Input id="game_version" name="game_version" required maxLength={40} placeholder="Original ARK Mobile"/></div>
    <div className="space-y-2"><Label htmlFor="region">Region *</Label><Input id="region" name="region" required maxLength={80}/></div>
    <div className="space-y-2"><Label htmlFor="gameplay_type">Gameplay *</Label><select id="gameplay_type" name="gameplay_type" className="h-11 w-full rounded-xl border border-white/10 bg-[#101a16] px-3 text-white"><option>PvE</option><option>PvP</option></select></div>
    <div className="space-y-2 md:col-span-2"><Label htmlFor="rates">Rates *</Label><Input id="rates" name="rates" required maxLength={120} placeholder="Describe your rates"/></div>
    <div className="space-y-2 md:col-span-2"><Label htmlFor="description">Description * (20–3000 characters)</Label><textarea id="description" name="description" required minLength={20} maxLength={3000} className="min-h-28 w-full rounded-xl border border-white/10 bg-[#101a16] p-3 text-white"/></div>
    <div className="space-y-2 md:col-span-2"><Label htmlFor="rules">Rules (one per line)</Label><textarea id="rules" name="rules" maxLength={6000} className="min-h-24 w-full rounded-xl border border-white/10 bg-[#101a16] p-3 text-white"/></div>
    <div className="space-y-2"><Label htmlFor="discord_invite">Discord invite URL</Label><Input id="discord_invite" name="discord_invite" type="url" maxLength={300}/></div>
    <div className="space-y-2"><Label htmlFor="website">Website URL</Label><Input id="website" name="website" type="url" maxLength={300}/></div>
    <div className="space-y-2"><Label htmlFor="banner_url">Banner URL (optional)</Label><Input id="banner_url" name="banner_url" type="url" maxLength={500}/></div>
    <div className="space-y-2"><Label htmlFor="logo_url">Logo URL (optional)</Label><Input id="logo_url" name="logo_url" type="url" maxLength={500}/></div>
    <div className="space-y-2 md:col-span-2"><Label htmlFor="connection_instructions">Connection instructions</Label><textarea id="connection_instructions" name="connection_instructions" maxLength={2000} className="min-h-20 w-full rounded-xl border border-white/10 bg-[#101a16] p-3 text-white"/></div>
    {error&&<p role="alert" className="md:col-span-2 text-sm text-red-300">{error}</p>}{notice&&<p role="status" className="md:col-span-2 text-sm text-accent">{notice}</p>}
    <div className="flex flex-wrap gap-3 md:col-span-2"><Button disabled={busy} name="action" value="draft" type="submit" variant="outline">Save draft</Button><Button disabled={busy} name="action" value="submit" type="submit">{busy?"Saving…":"Submit for moderation"}</Button></div>
  </form>;
}
