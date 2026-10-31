import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "About" };
export default async function AboutPage() {
  const settings = await getSiteSettings();
  return <div className="shell"><section className="page-intro"><div><span className="eyebrow">A LITTLE CONTEXT</span><h1 className="page-title">About</h1></div><p className="page-dek">A maker’s practice shaped by attention to people, technology, and visual culture.</p></section><section className="about-layout"><aside className="about-index">AV / INDEPENDENT PRACTICE<br />{settings.location}</aside><div className="about-copy"><p className="lead">{settings.about_intro}</p><p>I’m interested in the point where a system meets a person: what becomes obvious, what gets in the way, and what a thoughtful detail can change.</p><p>My work moves between digital products, visual systems, and writing. I like clear structure, useful constraints, and a finish that feels considered without calling attention to itself.</p><p>This portfolio is a working record. Each project page describes its current scope and status.</p><div className="about-lines"><div className="about-line"><span className="meta-label">PRACTICE</span><span>Design · development · writing</span></div><div className="about-line"><span className="meta-label">LOCATION</span><span>{settings.location}</span></div><div className="about-line"><span className="meta-label">AVAILABILITY</span><span>{settings.availability}</span></div></div></div></section></div>;
}
