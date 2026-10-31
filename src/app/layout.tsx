import type { Metadata } from "next";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: { default: "Avinash Raut — Designer, developer, writer", template: "%s — Avinash Raut" },
  description: "A maker's field notes on people, technology, and life — and the products, visual work, and writing that follow.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('avinash-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}` }} /></head><body>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content">{children}</main>
    <SiteFooter settings={settings} />
  </body></html>;
}
