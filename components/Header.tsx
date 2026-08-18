import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand-mark" aria-label="Disappear It home" style={{display:'inline-flex',alignItems:'center',flexShrink:0}}>
          <img
            src="/images/disappear-it-logo.png"
            alt="Disappear It Junk & Trash Removal"
            className="header-logo"
            style={{width:'118px',height:'auto',maxHeight:'54px',objectFit:'contain'}}
          />
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
