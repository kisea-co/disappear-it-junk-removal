import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand-mark footer-brand">
            <span className="brand-name">DISAPPEAR IT</span>
            <span className="brand-sub">JUNK &amp; TRASH REMOVAL</span>
          </div>
          <p className="footer-tagline">You&apos;ll never see it again.</p>
        </div>
        <div className="footer-contact">
          <a href="tel:+14705402892">(470) 540-2892</a>
          <a href="mailto:junkdisappears@gmail.com">junkdisappears@gmail.com</a>
          <span>Atlanta, GA + surrounding metro areas</span>
        </div>
        <div className="footer-action">
          <Link href="/contact" className="btn btn-small">Get a Quote</Link>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 Disappear It Junk &amp; Trash Removal</div>
    </footer>
  );
}
