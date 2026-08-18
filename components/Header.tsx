import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand-mark" aria-label="Disappear It home">
          <span className="brand-name">DISAPPEAR IT</span>
          <span className="brand-sub">JUNK &amp; TRASH REMOVAL</span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/our-work">Our Work</Link>
          <Link href="/commercial">Commercial</Link>
          <Link href="/contact" className="btn btn-small">Get a Quote</Link>
        </nav>
      </div>
    </header>
  );
}
