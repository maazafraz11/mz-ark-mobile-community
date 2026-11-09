import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured,getSupabaseConfig } from "@/lib/supabase/config";

export const supabase = (() => { const config=getSupabaseConfig(); return config?createSupabaseClient(config.url,config.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null; })();
export { isSupabaseConfigured };
export function getSupabaseServerClient(){return supabase;}
