import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "MZ ARK MOBILE",
  description: "Community platform for ARK Mobile players and server owners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative min-h-screen overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(183,255,82,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(82,216,193,0.14),_transparent_24%)]" />
          <div className="relative z-10">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
