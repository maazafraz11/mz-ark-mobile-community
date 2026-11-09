import { createClient } from "@/lib/supabase/server";
import { ServerCard } from "@/components/server-card";
import type { Server } from "@/lib/types";
import { DiscoveryFilters } from "@/components/discovery-filters";

export default async function ServerDiscoveryPage() {
 const supabase=createClient();
 if(!supabase)return <div className="page-shell"><div className="panel p-8"><div className="muted-label">Server directory</div><h1 className="mt-2 text-4xl font-black">Discover ARK Mobile communities</h1><p className="mt-4">Connect Supabase and apply the database schema to load live listings. No demo server metrics are shown.</p></div></div>;
 const {data,error}=await supabase.from("servers").select("id,name,slug,region,game_version,gameplay_type,rates,description,featured,status").eq("status","approved").order("featured",{ascending:false}).order("created_at",{ascending:false});
 const servers:Server[]=(data??[]).map((s:any)=>({id:s.slug||s.id,name:s.name,tag:"",region:s.region,gameVersion:s.game_version,serverType:s.gameplay_type,rates:s.rates,description:s.description,rules:[],discord:"",website:"",banner:"",logo:"",featured:s.featured,category:s.gameplay_type,playerCount:"Unavailable",rating:0,reviews:0,status:"Open"}));
 return <div className="page-shell space-y-8"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><div className="muted-label">Server directory</div><h1 className="mt-2 text-4xl font-black">Discover your next ARK Mobile community</h1><p className="mt-2">Approved owner-submitted listings. Online counts and server health are not verified.</p></div></div><DiscoveryFilters servers={servers}/>{error&&<p role="alert" className="text-red-300">Could not load servers: {error.message}</p>}</div>;
}
