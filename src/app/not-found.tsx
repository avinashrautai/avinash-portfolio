import Link from "next/link";
export default function NotFound() { return <div className="shell auth-page"><span className="eyebrow">404 / NOT FOUND</span><h1>That page isn’t here.</h1><p className="page-dek">The address may have moved, or the page may not be published.</p><p style={{ marginTop: 28 }}><Link href="/" className="text-link">Back to the home page ↗</Link></p></div>; }
