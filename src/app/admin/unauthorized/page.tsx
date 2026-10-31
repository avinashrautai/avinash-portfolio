import Link from "next/link";
import { signOut } from "@/app/actions";

export default function UnauthorizedPage() { return <div className="shell auth-page"><span className="eyebrow">STUDIO / ACCESS</span><h1>Not on the list.</h1><p className="page-dek">This account is signed in but is not authorized to edit the portfolio.</p><form action={signOut} style={{ marginTop: 24 }}><button className="quiet-button" type="submit">Sign out</button></form><p><Link className="back-link" href="/">← Return to portfolio</Link></p></div>; }
