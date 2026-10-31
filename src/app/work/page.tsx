import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };
export default async function WorkPage() {
  const projects = await getProjects();
  return <div className="shell"><section className="page-intro"><div><span className="eyebrow">A SMALL, GROWING ARCHIVE</span><h1 className="page-title">Selected work</h1></div><p className="page-dek">Products, tools, and visual projects. Each entry stays close to what is known and marks what still needs documentation.</p></section><section className="page-list-section"><div className="section-head"><span className="section-title">Project index</span><span className="section-aside">{projects.length} entries</span></div><ProjectList projects={projects} /></section></div>;
}
