import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MZ ARK MOBILE | Setup",
  description: "Supabase and local setup for the MZ ARK MOBILE platform.",
};

export default function SetupScreen() {
  return (
    <div className="page-shell">
      <div className="panel p-8">
        <div className="muted-label">Configuration required</div>
        <h1 className="mt-2 text-4xl font-black text-white">Connect your Supabase project</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Environment variables are not configured yet. Add your project URL and anon key in a .env.local file to enable authentication, storage and protected dashboard routes.
        </p>
      </div>
    </div>
  );
}
