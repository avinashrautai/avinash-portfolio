import type { Metadata } from "next";
import { ArticleList } from "@/components/article-list";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = { title: "Writing" };
export default async function WritingPage() {
  const articles = await getArticles();
  return <div className="shell"><section className="page-intro"><div><span className="eyebrow">OBSERVATIONS, QUESTIONS, WORKING NOTES</span><h1 className="page-title">Writing</h1></div><p className="page-dek">Notes on people, systems, and the small decisions that make useful work feel clear.</p></section><section className="page-list-section"><div className="section-head"><span className="section-title">Field notes</span></div>{articles.length ? <ArticleList articles={articles} /> : <p className="empty-note">Writing is being prepared.</p>}</section></div>;
}
