import Link from "next/link";
import type { Article } from "@/types/content";

export function ArticleList({ articles }: { articles: Article[] }) {
  return <div className="editorial-list article-list">
    {articles.map((article, index) => <Link href={`/writing/${article.slug}`} className="article-row" key={article.id}>
      <span className="row-index"><span>{String(index + 1).padStart(2, "0")}</span><time dateTime={article.published_at}>{new Date(`${article.published_at}T12:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</time></span>
      <span className="row-main"><span className="row-category">{article.category}</span><span className="row-title">{article.title}</span><span className="row-description">{article.dek}</span></span>
      <span className="row-link">Read note <span aria-hidden="true">↗</span></span>
    </Link>)}
  </div>;
}
