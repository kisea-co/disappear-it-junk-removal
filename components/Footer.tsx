import Link from 'next/link';
import FooterHighlights from './FooterHighlights';

export default function Footer() {
  return (
    <footer className="site-footer" style={{padding:0}}>
      <FooterHighlights />
      <div style={{padding:'50px 0 24px'}}>
        <div className="container footer-grid">
          <div>
            <div className="brand-mark footer-brand">
              <span className="brand-name">DISAPPEAR IT</span>
              <span className="brand-sub">JUNK &amp; TRASH REMOVAL LLC</span>
            </div>
            <p className="footer-tagline">You&apos;ll never see it again.</p>
          </div>
          <div className="footer-contact">
            <a href="tel:+14048579200">Call Us</a>
            <a href="mailto:junkdisappears@gmail.com">Email Us</a>
            <span>Atlanta, GA + surrounding metro areas</span>
          </div>
          <div className="footer-action">
            <Link href="/contact" className="btn btn-small">Get a Quote</Link>
          </div>
        </div>
        <div className="container footer-bottom">© 2026 Disappear It Junk &amp; Trash Removal LLC</div>
      </div>
    </footer>
  );
}
