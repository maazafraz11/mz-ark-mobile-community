import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export default function LoginPage() { return <div className="page-shell flex min-h-[65vh] items-center justify-center"><Suspense fallback={<div className="panel h-96 w-full max-w-lg animate-pulse" />}><AuthForm mode="login" /></Suspense></div>; }
