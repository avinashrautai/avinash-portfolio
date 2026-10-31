import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Public portfolio content never needs an authenticated browser session.
 * Keeping this separate from the cookie-backed server client also lets
 * Next.js render public pages safely during a production build.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return url && key ? createSupabaseClient(url, key) : null;
}
