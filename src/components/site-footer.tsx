import type { SiteSettings } from "@/types/content";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return <footer className="site-footer shell">
    <div><span className="eyebrow">A NOTE, OR A GOOD QUESTION</span>{settings.contact_email ? <a className="footer-email" href={`mailto:${settings.contact_email}`}>{settings.contact_email} <span aria-hidden="true">↗</span></a> : <a className="footer-email" href="/contact">Get in touch <span aria-hidden="true">↗</span></a>}</div>
    <div className="footer-meta"><span>Made with care in {settings.location}.</span><span>© {new Date().getFullYear()} Avinash Raut</span></div>
  </footer>;
}
