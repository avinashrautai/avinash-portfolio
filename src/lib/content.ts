import { cache } from "react";
import { seedProjects, seedSettings } from "@/lib/seed";
import { createPublicClient } from "@/lib/supabase/public";
import type { Article, Project, SiteSettings } from "@/types/content";

export const getProjects = cache(async (includeDrafts = false): Promise<Project[]> => {
  const supabase = createPublicClient();
  if (supabase) {
    const { data, error } = await supabase.from("projects").select("*").order("sort_order");
    if (!error && data) return (data as Project[]).filter((p) => includeDrafts || p.published);
  }
  return seedProjects.filter((p) => includeDrafts || p.published).sort((a, b) => a.sort_order - b.sort_order);
});

export const getProject = cache(async (slug: string): Promise<Project | null> =>
  (await getProjects()).find((p) => p.slug === slug) ?? null);

export const getArticles = cache(async (includeDrafts = false): Promise<Article[]> => {
  const withdrawnSeedSlugs = new Set(["making-room-for-the-useful", "systems-are-made-of-people"]);
  const supabase = createPublicClient();
  if (supabase) {
    const { data, error } = await supabase.from("articles").select("*").order("published_at", { ascending: false });
    if (!error && data) return (data as Article[]).filter((a) => includeDrafts || (a.published && !withdrawnSeedSlugs.has(a.slug)));
  }
  return [];
});

export const getArticle = cache(async (slug: string): Promise<Article | null> =>
  (await getArticles()).find((a) => a.slug === slug) ?? null);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const supabase = createPublicClient();
  if (supabase) {
    const { data, error } = await supabase.from("site_settings").select("key,value");
    if (!error && data?.length) {
      const stored = Object.fromEntries(data.map((r) => [r.key, r.value])) as Partial<SiteSettings>;
      return { ...seedSettings, ...stored, contact_email: stored.contact_email || seedSettings.contact_email };
    }
  }
  return seedSettings;
});
