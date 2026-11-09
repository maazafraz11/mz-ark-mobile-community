"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "login" | "register" | "forgot" | "reset" }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const search = useSearchParams();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const supabase = createClient();
    if (!supabase) { setError("Supabase is not configured. Copy .env.example to .env.local and add your project settings."); setBusy(false); return; }
    try {
      if (mode === "register") {
        const name = String(form.get("name") ?? "").trim();
        const accountType = String(form.get("accountType") ?? "player");
        const { error: authError } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/owners/setup`, data: { full_name: name, account_type: accountType } },
        });
        if (authError) throw authError;
        setMessage("Check your inbox to verify your email. The verification link will bring you back to continue setup.");
      } else if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        router.replace(search.get("next") || "/owners/dashboard"); router.refresh();
      } else if (mode === "forgot") {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password` });
        if (authError) throw authError;
        setMessage("If an account exists for that email, a password reset link is on its way.");
      } else {
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        setMessage("Your password has been updated. You can now sign in.");
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to complete this request."); }
    finally { setBusy(false); }
  }

  const title = { login: "Welcome back", register: "Create your account", forgot: "Reset your password", reset: "Choose a new password" }[mode];
  return <div className="panel w-full max-w-lg p-6 md:p-8">
    <div className="muted-label">{mode === "register" ? "Join the community" : "MZ ARK account"}</div>
    <h1 className="mt-2 text-3xl font-black text-white">{title}</h1>
    <form onSubmit={submit} className="mt-6 space-y-5">
      {mode === "register" && <>
        <div className="space-y-2"><Label htmlFor="name">Display name</Label><Input id="name" name="name" required maxLength={80} autoComplete="name" /></div>
        <div className="space-y-2"><Label htmlFor="accountType">Account type</Label><select id="accountType" name="accountType" className="h-11 w-full rounded-xl border border-white/10 bg-[#101a16] px-3 text-white"><option value="player">Player</option><option value="server_owner">Server owner</option></select></div>
      </>}
      {mode !== "reset" && <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" /></div>}
      {(mode === "login" || mode === "register" || mode === "reset") && <div className="space-y-2"><Label htmlFor="password">{mode === "reset" ? "New password" : "Password"}</Label><Input id="password" name="password" type="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} /></div>}
      {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
      {message && <p role="status" className="rounded-xl border border-accent/20 bg-accent/5 p-3 text-sm text-accent">{message}</p>}
      <Button disabled={busy} className="w-full">{busy ? "Please wait…" : mode === "login" ? "Sign in" : mode === "register" ? "Create account" : mode === "forgot" ? "Send reset link" : "Update password"}</Button>
    </form>
    <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-slate-300">
      {mode === "login" ? <><Link className="text-accent" href="/auth/forgot-password">Forgot password?</Link><Link className="text-accent" href="/auth/register">Create account</Link></> : mode === "register" ? <Link className="text-accent" href="/auth/login">Already registered? Sign in</Link> : <Link className="text-accent" href="/auth/login">Back to sign in</Link>}
    </div>
  </div>;
}
