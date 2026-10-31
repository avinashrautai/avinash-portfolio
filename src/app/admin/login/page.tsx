import Link from "next/link";
import { signIn } from "@/app/actions";
import { hasSupabaseConfig } from "@/lib/admin";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  if (!hasSupabaseConfig()) return <div className="shell auth-page"><span className="eyebrow">STUDIO / PRIVATE</span><h1>Sign in</h1><p className="page-dek">Admin access is not configured on this installation.</p><p style={{ marginTop: 24 }}><Link className="text-link" href="/admin/setup">Read setup notes ↗</Link></p></div>;
  return <div className="shell auth-page"><span className="eyebrow">STUDIO / PRIVATE</span><h1>Sign in</h1><p className="page-dek">Use the authorized Supabase account for this portfolio.</p>{error && <p className="auth-error" role="alert">{error}</p>}<form action={signIn} className="auth-form"><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label><button className="quiet-button" type="submit">Continue ↗</button></form><Link className="back-link" href="/">← Return to portfolio</Link></div>;
}
