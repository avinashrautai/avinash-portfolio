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
  if (!user) redirect("/admin/login");

  const { data: isAdmin, error } = await supabase.rpc("is_portfolio_admin");
  if (error || !isAdmin) redirect("/admin/unauthorized");

  return { supabase, user };
}
