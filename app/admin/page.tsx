import { AdminQueue } from "@/components/admin-queue";
export default function AdminPage(){return <div className="page-shell space-y-8"><div><div className="muted-label">Platform admin</div><h1 className="mt-2 text-4xl font-black">Moderation center</h1><p className="mt-2">Review pending server listings and feature approved communities.</p></div><AdminQueue/></div>;}
