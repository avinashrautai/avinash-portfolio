import Link from "next/link";
import "./home.css";
import { getArticles, getProjects } from "@/lib/content";

export default async function HomePage() {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  const pinnedProject = projects[0];
  const latestArticle = articles[0];

  return <div className="shell">
    <section className="home-hero">
      <div><h1 className="hero-title">I see people, technology and life.</h1></div>
      <div className="hero-copy"><p>I pay attention to how people use the systems around them. Then I make useful products, visual work, and writing from what I notice.</p><div className="hero-links"><Link className="text-link" href="/work">Selected work <span aria-hidden="true">↘</span></Link><Link className="text-link" href="/writing">Writing <span aria-hidden="true">↗</span></Link></div></div>
    </section>
    {pinnedProject && <section className="home-feature" aria-labelledby="pinned-work"><div className="section-head"><h2 className="section-title" id="pinned-work">Pinned work</h2><Link className="section-aside" href="/work">All work ↗</Link></div><Link href={`/work/${pinnedProject.slug}`} className="featured-project"><div className="featured-meta"><span>{pinnedProject.category}</span><span>{pinnedProject.status}</span></div><div><h2>{pinnedProject.title}</h2><p>{pinnedProject.summary}</p></div><span className="featured-arrow" aria-hidden="true">↗</span></Link></section>}
    {latestArticle && <section className="home-feature home-latest" aria-labelledby="latest-note"><div className="section-head"><h2 className="section-title" id="latest-note">Latest note</h2><Link className="section-aside" href="/writing">All notes ↗</Link></div><Link href={`/writing/${latestArticle.slug}`} className="latest-note"><span className="eyebrow">{latestArticle.category}</span><h2>{latestArticle.title}</h2><p>{latestArticle.dek}</p><span className="featured-arrow" aria-hidden="true">↗</span></Link></section>}
  </div>;
}
