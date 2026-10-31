import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };
export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <div className="shell"><section className="page-intro"><div><span className="eyebrow">CONTACT</span><h1 className="page-title">Start a conversation.</h1></div><p className="page-dek">A project, a collaboration, or a useful question — email is the simplest way to reach me.</p></section><section className="contact-layout"><div className="contact-block"><span className="eyebrow">EMAIL</span><div className="contact-address">{settings.contact_email ? <a href={`mailto:${settings.contact_email}`}>{settings.contact_email} ↗</a> : <p className="contact-note">Email contact has not been configured yet.</p>}</div></div><div className="contact-block"><span className="eyebrow">CURRENTLY</span><p className="contact-note">{settings.availability}. Based in {settings.location}.</p></div></section></div>;
}
