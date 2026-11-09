"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ServerRow={id:string;name:string;status:string;region:string;gameplay_type:string;created_at:string};
export function OwnerDashboard() {
 const [rows,setRows]=useState<ServerRow[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
 useEffect(()=>{let mounted=true;(async()=>{const supabase=createClient();if(!supabase){if(mounted){setError("Supabase is not configured.");setLoading(false);}return;}const {data:{user}}=await supabase.auth.getUser();if(!user){if(mounted){setError("Sign in to view your owner dashboard.");setLoading(false);}return;}const {data,error:queryError}=await supabase.from("servers").select("id,name,status,region,gameplay_type,created_at").eq("owner_id",user.id).order("created_at",{ascending:false});if(mounted){setRows(data??[]);setError(queryError?.message??"");setLoading(false);}})();return()=>{mounted=false;};},[]);
 return <div className="page-shell space-y-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><div className="muted-label">Owner console</div><h1 className="mt-2 text-4xl font-black">Your servers</h1><p className="mt-2">Manage listings and review status. Metrics appear after real events are collected.</p></div><Button asChild><Link href="/owners/setup">Create a listing</Link></Button></div>
 {loading?<div className="panel h-48 animate-pulse" aria-label="Loading servers"/>:error?<div role="alert" className="panel p-6 text-red-200">{error}</div>:rows.length===0?<div className="panel p-8 text-center"><h2 className="text-2xl font-bold">No listings yet</h2><p className="mt-2">Create a listing draft or submit one for review.</p><Button asChild className="mt-5"><Link href="/owners/setup">Get started</Link></Button></div>:<div className="panel divide-y divide-white/10">{rows.map(server=><div key={server.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-bold">{server.name}</h2><p className="mt-1 text-sm">{server.region} · {server.gameplay_type}</p></div><div className="flex items-center gap-3"><Badge className="capitalize">{server.status}</Badge><Button asChild variant="outline" size="sm"><Link href={`/owners/servers/${server.id}/edit`}>Manage</Link></Button></div></div>)}</div>}
 </div>;
}
