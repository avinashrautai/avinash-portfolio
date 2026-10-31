import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function requireAdmin() {
  if (!hasSupabaseConfig()) redirect("/admin/setup");
  const supabase = await createClient();
  if (!supabase) redirect("/admin/setup");
  const { data: { user } } = await supabase.auth.getUser();
  const admins = (process.env.ADMIN_USER_IDS || "").split(",").map((id) => id.trim()).filter(Boolean);
  if (!user) redirect("/admin/login");
  if (!admins.includes(user.id)) redirect("/admin/unauthorized");
  return { supabase, user };
}
