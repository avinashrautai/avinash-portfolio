import Link from "next/link";
import type { Project } from "@/types/content";

export function ProjectList({ projects }: { projects: Project[] }) {
  return <div className="editorial-list project-list">
    {projects.map((project, index) => <Link href={`/work/${project.slug}`} className="project-row" key={project.id}>
      <span className="row-index"><span>{String(index + 1).padStart(2, "0")}</span><span className="row-status">{project.status}</span></span>
      <span className="row-main"><span className="row-category">{project.category}</span><span className="row-title">{project.title}</span><span className="row-description">{project.summary}</span></span>
      <span className="row-link">{project.direction || "View project"} <span aria-hidden="true">↗</span></span>
    </Link>)}
  </div>;
}
