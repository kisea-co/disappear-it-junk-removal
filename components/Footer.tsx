export default function Footer() {
  return (
    <footer className="site-footer" style={{padding:0}}>
      <div style={{padding:'50px 0 24px'}}>
        <div className="container footer-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div>
            <div className="brand-mark footer-brand">
              <span className="brand-name">DISAPPEAR IT</span>
              <span className="brand-sub">JUNK &amp; TRASH REMOVAL LLC</span>
            </div>
            <p className="footer-tagline">You&apos;ll never see it again.</p>
          </div>
          <div className="footer-contact">
            <a href="tel:+14048579200">(404) 857-9200</a>
            <a href="mailto:junkdisappears@gmail.com">junkdisappears@gmail.com</a>
            <span>Atlanta, GA + surrounding metro areas</span>
          </div>
        </div>
        <div className="container footer-bottom">© 2026 Disappear It Junk &amp; Trash Removal LLC</div>
      </div>
    </footer>
  );
}
