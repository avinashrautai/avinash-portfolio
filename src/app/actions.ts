"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

const value = (form: FormData, name: string) => String(form.get(name) || "").trim();
const checkbox = (form: FormData, name: string) => form.get(name) === "on";
function actionFailure(message: string): never {
  redirect(`/admin?error=${encodeURIComponent(message)}`);
}

export async function signIn(form: FormData) {
  const email = value(form, "email");
  const password = value(form, "password");
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  if (!supabase) redirect("/admin/setup");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  redirect("/admin");
}

export async function signOut() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { error } = await supabase?.auth.signOut() ?? { error: null };
  if (error) actionFailure(`Could not sign out: ${error.message}`);
  redirect("/admin/login");
}

export async function saveProject(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(form, "id");
  const row = {
    slug: value(form, "slug"), title: value(form, "title"), category: value(form, "category"),
    summary: value(form, "summary"), body: value(form, "body"), status: value(form, "status"),
    year: value(form, "year"), image_url: value(form, "image_url") || null,
    published: checkbox(form, "published"), sort_order: Number(form.get("sort_order") || 0),
  };
  let oldSlug: string | null = null;
  if (id) {
    const { data: existing, error: lookupError } = await supabase.from("projects").select("slug").eq("id", id).maybeSingle();
    if (lookupError) actionFailure(`Could not load project: ${lookupError.message}`);
    if (!existing) actionFailure("Could not save project: the record no longer exists.");
    oldSlug = existing.slug;
    const { error } = await supabase.from("projects").update(row).eq("id", id);
    if (error) actionFailure(`Could not save project: ${error.message}`);
  } else {
    const { error } = await supabase.from("projects").insert(row);
    if (error) actionFailure(`Could not add project: ${error.message}`);
  }
  revalidatePath("/"); revalidatePath("/work"); revalidatePath(`/work/${row.slug}`); if (oldSlug && oldSlug !== row.slug) revalidatePath(`/work/${oldSlug}`); revalidatePath("/admin");
}

export async function deleteProject(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(form, "id");
  const { data: project, error: lookupError } = await supabase.from("projects").select("slug").eq("id", id).maybeSingle();
  if (lookupError) actionFailure(`Could not load project: ${lookupError.message}`);
  if (!project) actionFailure("Could not delete project: the record no longer exists.");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) actionFailure(`Could not delete project: ${error.message}`);
  revalidatePath("/"); revalidatePath("/work"); revalidatePath(`/work/${project.slug}`); revalidatePath("/admin");
}

export async function saveArticle(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(form, "id");
  const row = {
    slug: value(form, "slug"), title: value(form, "title"), dek: value(form, "dek"),
    body: value(form, "body"), category: value(form, "category"),
    published_at: value(form, "published_at") || new Date().toISOString().slice(0, 10),
    published: checkbox(form, "published"),
  };
  let oldSlug: string | null = null;
  if (id) {
    const { data: existing, error: lookupError } = await supabase.from("articles").select("slug").eq("id", id).maybeSingle();
    if (lookupError) actionFailure(`Could not load writing entry: ${lookupError.message}`);
    if (!existing) actionFailure("Could not save writing entry: the record no longer exists.");
    oldSlug = existing.slug;
    const { error } = await supabase.from("articles").update(row).eq("id", id);
    if (error) actionFailure(`Could not save writing entry: ${error.message}`);
  } else {
    const { error } = await supabase.from("articles").insert(row);
    if (error) actionFailure(`Could not add writing entry: ${error.message}`);
  }
  revalidatePath("/"); revalidatePath("/writing"); revalidatePath(`/writing/${row.slug}`); if (oldSlug && oldSlug !== row.slug) revalidatePath(`/writing/${oldSlug}`); revalidatePath("/admin");
}

export async function deleteArticle(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(form, "id");
  const { data: article, error: lookupError } = await supabase.from("articles").select("slug").eq("id", id).maybeSingle();
  if (lookupError) actionFailure(`Could not load writing entry: ${lookupError.message}`);
  if (!article) actionFailure("Could not delete writing entry: the record no longer exists.");
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) actionFailure(`Could not delete writing entry: ${error.message}`);
  revalidatePath("/"); revalidatePath("/writing"); revalidatePath(`/writing/${article.slug}`); revalidatePath("/admin");
}

export async function saveSettings(form: FormData) {
  const { supabase } = await requireAdmin();
  const entries = [
    ["contact_email", value(form, "contact_email")],
    ["location", value(form, "location")],
    ["availability", value(form, "availability")],
    ["about_intro", value(form, "about_intro")],
  ].map(([key, val]) => ({ key, value: val }));
  const { error } = await supabase.from("site_settings").upsert(entries, { onConflict: "key" });
  if (error) actionFailure(`Could not save site settings: ${error.message}`);
  revalidatePath("/"); revalidatePath("/about"); revalidatePath("/contact"); revalidatePath("/admin");
}
