import Link from "next/link";
import { ArticleList } from "@/components/article-list";
import { ProjectList } from "@/components/project-list";
import { getArticles, getProjects } from "@/lib/content";

export default async function HomePage() {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  return <div className="shell">
    <section className="home-hero">
      <div><h1 className="hero-title">I see people, technology and life.</h1></div>
      <div className="hero-copy"><p>I pay attention to how people use the systems around them. Then I make useful products, visual work, and writing from what I notice.</p><div className="hero-links"><Link className="text-link" href="/work">Selected work <span aria-hidden="true">↘</span></Link><Link className="text-link" href="/writing">Writing <span aria-hidden="true">↗</span></Link></div></div>
    </section>
    <section className="section" aria-labelledby="selected-work"><div className="section-head"><h2 className="section-title" id="selected-work">Selected work</h2><span className="section-aside">{String(projects.length).padStart(2, "0")} entries</span></div><ProjectList projects={projects.slice(0, 3)} /><div style={{ marginTop: 22 }}><Link className="text-link" href="/work">All work <span aria-hidden="true">↗</span></Link></div></section>
    <section className="split-section">
      <div className="writing-preview"><div className="section-head"><h2 className="section-title">Recent writing</h2><Link className="section-aside" href="/writing">All notes ↗</Link></div>{articles.length ? <ArticleList articles={articles.slice(0, 2)} /> : <p className="empty-note">Writing is being prepared.</p>}</div>
      <div className="working-notes"><span className="eyebrow">A FEW THINGS I RETURN TO</span><p className="notes-intro">Looking closely. Making clearly. Keeping the human scale in view.</p><div className="note-lines"><p>Small digital products</p><p>Visual systems and image making</p><p>Useful tools and careful writing</p></div></div>
    </section>
  </div>;
}
