import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/content";

export async function generateStaticParams() { return (await getArticles()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const a = await getArticle(slug); return { title: a?.title || "Writing", description: a?.dek }; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = await getArticle(slug); if (!article) notFound();
  return <article className="shell"><header className="detail-top"><Link href="/writing" className="back-link">← Writing index</Link><div className="detail-labels"><span className="eyebrow">{article.category}</span><time className="eyebrow" dateTime={article.published_at}>{new Date(`${article.published_at}T12:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</time></div><h1 className="detail-title">{article.title}</h1><p className="detail-dek">{article.dek}</p></header><div className="detail-body"><aside className="detail-side"><span className="meta-label">FIELD NOTE</span><br />A working thought on making useful things.</aside><div className="prose">{article.body.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div></div></article>;
}
