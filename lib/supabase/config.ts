const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(url && key && !url.includes("your-project"));
}

export function getSupabaseConfig() {
  if (!isSupabaseConfigured()) return null;
  return { url: url as string, key: key as string };
}
