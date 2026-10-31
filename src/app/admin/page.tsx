import Link from "next/link";
import { deleteArticle, deleteProject, saveArticle, saveProject, saveSettings, signOut } from "@/app/actions";
import { ProjectImageField } from "@/components/project-image-field";
import { getArticles, getProjects, getSiteSettings } from "@/lib/content";
import { requireAdmin } from "@/lib/admin";
import type { Article, Project } from "@/types/content";

function ProjectFields({ project }: { project?: Project }) {
  return <div className="admin-form">
    <input type="hidden" name="id" value={project?.id || ""} />
    <label>Title<input name="title" defaultValue={project?.title} required /></label>
    <label>Slug<input name="slug" defaultValue={project?.slug} required pattern="[a-z0-9-]+" /></label>
    <label>Category<input name="category" defaultValue={project?.category || "PROJECT / OTHER"} /></label>
    <label>Status<input name="status" defaultValue={project?.status || "In progress"} /></label>
    <label>Year<input name="year" defaultValue={project?.year} /></label>
    <label>Order<input name="sort_order" type="number" defaultValue={project?.sort_order ?? 10} /></label>
    <label className="wide">Summary<textarea name="summary" defaultValue={project?.summary} required /></label>
    <label className="wide">Project details<textarea className="long" name="body" defaultValue={project?.body} required /></label>
    <div className="wide"><ProjectImageField initialUrl={project?.image_url} /></div>
    <label className="admin-check wide"><input type="checkbox" name="published" defaultChecked={project?.published ?? false} /> Published</label>
    <div className="button-row wide"><button className="quiet-button" type="submit">{project ? "Save project" : "Add project"} ↗</button>{project && <button className="danger-button" formAction={deleteProject} type="submit">Delete entry</button>}</div>
  </div>;
}

function ArticleFields({ article }: { article?: Article }) {
  return <div className="admin-form">
    <input type="hidden" name="id" value={article?.id || ""} />
    <label>Title<input name="title" defaultValue={article?.title} required /></label>
    <label>Slug<input name="slug" defaultValue={article?.slug} required pattern="[a-z0-9-]+" /></label>
    <label>Category<input name="category" defaultValue={article?.category || "FIELD NOTE"} /></label>
    <label>Publish date<input name="published_at" type="date" defaultValue={article?.published_at || new Date().toISOString().slice(0, 10)} /></label>
    <label className="wide">Summary<textarea name="dek" defaultValue={article?.dek} required /></label>
    <label className="wide">Article body<textarea className="long" name="body" defaultValue={article?.body} required /></label>
    <label className="admin-check wide"><input type="checkbox" name="published" defaultChecked={article?.published ?? false} /> Published</label>
    <div className="button-row wide"><button className="quiet-button" type="submit">{article ? "Save writing" : "Add writing"} ↗</button>{article && <button className="danger-button" formAction={deleteArticle} type="submit">Delete entry</button>}</div>
  </div>;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const { user } = await requireAdmin();
  const [projects, articles, settings] = await Promise.all([getProjects(true), getArticles(true), getSiteSettings()]);
  return <div className="shell admin-shell">
    <header className="admin-top"><div><span className="eyebrow">AV / PRIVATE STUDIO</span><h1 className="admin-title">Content desk</h1><p className="admin-note">Signed in as {user.email}</p></div><form action={signOut}><button className="quiet-button" type="submit">Sign out</button></form></header>
    {error && <p className="status-message" role="alert">{error}</p>}
    <nav className="admin-nav" aria-label="Admin sections"><a href="#projects">Projects</a><a href="#writing">Writing</a><a href="#settings">Site settings</a><Link href="/">View site ↗</Link></nav>
    <section className="admin-section" id="projects"><h2>Projects <span className="section-aside">{projects.length} records</span></h2><details className="admin-item"><summary><span>Add a project</span><span className="row-status">New record</span></summary><form action={saveProject}><ProjectFields /></form></details>{projects.map((project) => <details className="admin-item" key={project.id}><summary><span>{project.title}</span><span className="row-status">{project.published ? "Published" : "Draft"} · {project.status}</span></summary><form action={saveProject}><ProjectFields project={project} /></form></details>)}</section>
    <section className="admin-section" id="writing"><h2>Writing <span className="section-aside">{articles.length} records</span></h2><details className="admin-item"><summary><span>Add a writing entry</span><span className="row-status">New record</span></summary><form action={saveArticle}><ArticleFields /></form></details>{articles.map((article) => <details className="admin-item" key={article.id}><summary><span>{article.title}</span><span className="row-status">{article.published ? "Published" : "Draft"}</span></summary><form action={saveArticle}><ArticleFields article={article} /></form></details>)}</section>
    <section className="admin-section" id="settings"><h2>Site settings</h2><p className="admin-note">These settings are saved to Supabase and used across the public site.</p><form action={saveSettings} className="admin-form"><label>Contact email<input name="contact_email" type="email" defaultValue={settings.contact_email} /></label><label>Location<input name="location" defaultValue={settings.location} /></label><label>Availability<input name="availability" defaultValue={settings.availability} /></label><label className="wide">About introduction<textarea name="about_intro" defaultValue={settings.about_intro} /></label><div className="button-row wide"><button className="quiet-button" type="submit">Save settings ↗</button></div></form></section>
  </div>;
}
