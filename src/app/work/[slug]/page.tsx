import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";

export async function generateStaticParams() { return (await getProjects()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = await getProject(slug); return { title: p?.title || "Project" }; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = await getProject(slug); if (!project) notFound();
  return <article className="shell"><header className="detail-top"><Link href="/work" className="back-link">← Work index</Link><div className="detail-labels"><span className="eyebrow">{project.category}</span><span className="eyebrow">{project.status}</span><span className="eyebrow">{project.year}</span></div><h1 className="detail-title">{project.title}</h1><p className="detail-dek">{project.summary}</p></header><div className="detail-body"><aside className="detail-side"><span className="meta-label">CURRENT STATUS</span><br />{project.status}</aside><div className="prose">{project.body.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div></div></article>;
}
