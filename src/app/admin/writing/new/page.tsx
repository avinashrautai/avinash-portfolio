import Link from "next/link";
import { saveArticle } from "@/app/actions";
import { ArticleFields } from "@/app/admin/page";
import { requireAdmin } from "@/lib/admin";

export default async function NewWritingPage() {
  await requireAdmin();
  return <main className="shell editor-shell">
    <Link className="back-link" href="/admin">← Content desk</Link>
    <header className="editor-heading">
      <span className="eyebrow">WRITING / NEW ENTRY</span>
      <h1>Write the note.</h1>
      <p>Save it as a draft first. Publish only when it is ready to be public.</p>
    </header>
    <form action={saveArticle} className="editor-form"><ArticleFields /></form>
  </main>;
}
