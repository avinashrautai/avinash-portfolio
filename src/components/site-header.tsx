"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [["Home", "/"], ["Work", "/work"], ["Writing", "/writing"], ["About", "/about"], ["Contact", "/contact"]];

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="site-header shell">
    <Link href="/" className="brand" aria-label="Avinash Raut, home">
      <span className="monogram" aria-hidden="true">AV</span>
      <span className="brand-name">Avinash Raut</span>
    </Link>
    <ThemeToggle />
    <nav className="main-nav" aria-label="Main navigation">
      {links.map(([label, href]) => { const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`); return <Link href={href} key={href} aria-current={active ? "page" : undefined}>{label}</Link>; })}
    </nav>
  </header>;
}
