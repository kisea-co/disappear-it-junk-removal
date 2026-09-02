'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navLinkStyle = { display: 'block' } as const;

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand-mark" aria-label="Disappear It Junk & Trash Removal LLC home" onClick={closeMenu}>
          <span className="brand-name">DISAPPEAR IT</span>
          <span className="brand-sub">JUNK &amp; TRASH REMOVAL LLC</span>
        </Link>

        <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>

        <nav id="primary-navigation" className={`main-nav${menuOpen ? ' mobile-open' : ''}`} aria-label="Primary navigation">
          <Link href="/" onClick={closeMenu} style={navLinkStyle}>Home</Link>
          <Link href="/services" onClick={closeMenu} style={navLinkStyle}>Services</Link>
          <Link href="/our-work" onClick={closeMenu} style={navLinkStyle}>Our Work</Link>
          <Link href="/commercial" onClick={closeMenu} style={navLinkStyle}>Commercial</Link>
          <Link href="/trashketball" onClick={closeMenu} style={navLinkStyle}>Trashketball</Link>
          <span className="desktop-quote-wrap"><Link href="/contact" className="btn btn-small" onClick={closeMenu}>Get a Quote</Link></span>
        </nav>
      </div>

      <style jsx>{`
        .mobile-menu-toggle{display:none;width:42px;height:42px;padding:8px;border:0;background:transparent;color:inherit;cursor:pointer;flex:0 0 auto}
        .mobile-menu-toggle span{display:block;width:100%;height:2px;margin:6px 0;background:#f4f0e8;transition:transform .2s ease,opacity .2s ease}
        .desktop-quote-wrap{display:inline-flex}
        @media(max-width:720px){
          .nav-wrap{position:relative;min-height:92px;padding-top:10px;padding-bottom:10px}
          .brand-name{font-size:.8rem;letter-spacing:.14em}.brand-sub{font-size:.44rem;letter-spacing:.19em}
          .mobile-menu-toggle{display:block}
          .main-nav{display:none;position:absolute;top:calc(100% + 1px);left:-13px;right:-13px;z-index:60;padding:20px 20px 24px;background:#090909;border-bottom:1px solid rgba(209,174,71,.45);box-shadow:0 18px 30px rgba(0,0,0,.32)}
          .main-nav.mobile-open{display:flex;flex-direction:column;align-items:stretch;gap:8px}
          .main-nav.mobile-open>a:not(.btn){display:block!important;padding:18px 4px;border-bottom:1px solid rgba(255,255,255,.1);color:#f4f0e8;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase}
          .main-nav.mobile-open>a:not(.btn):nth-of-type(5){border-bottom:0}
          .desktop-quote-wrap{display:none!important}
        }
      `}</style>
    </header>
  );
}
