import Link from "next/link";

export default function AdminSetupPage() {
  return <div className="shell auth-page"><span className="eyebrow">STUDIO / SETUP</span><h1>Connect the studio.</h1><p className="page-dek">The public site is running from local seed content. To enable protected editing, add your Supabase project URL, anon key, and admin user ID to <code>.env.local</code>, then apply <code>supabase/schema.sql</code>.</p><p className="admin-note" style={{ marginTop: 24 }}>See the README for the exact setup sequence. No Supabase values are required to browse the public portfolio.</p><p style={{ marginTop: 26 }}><Link className="text-link" href="/">Return to the site ↗</Link></p></div>;
}
