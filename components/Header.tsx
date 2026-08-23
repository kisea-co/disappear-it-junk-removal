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
        <Link href="/" className="brand-mark" aria-label="Disappear It home" onClick={closeMenu}>
          <span className="brand-name">DISAPPEAR IT</span>
          <span className="brand-sub">JUNK &amp; TRASH REMOVAL</span>
        </Link>

        <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>

        <nav id="primary-navigation" className={`main-nav${menuOpen ? ' mobile-open' : ''}`} aria-label="Primary navigation">
          <Link href="/" onClick={closeMenu} style={navLinkStyle}>Home</Link>
          <Link href="/services" onClick={closeMenu} style={navLinkStyle}>Services</Link>
          <Link href="/our-work" onClick={closeMenu} style={navLinkStyle}>Our Work</Link>
          <Link href="/commercial" onClick={closeMenu} style={navLinkStyle}>Commercial</Link>
          <Link href="/contact" className="desktop-quote btn btn-small" onClick={closeMenu}>Get a Quote</Link>
        </nav>
      </div>

      <style jsx>{`
        .mobile-menu-toggle{display:none;width:42px;height:42px;padding:8px;border:0;background:transparent;color:inherit;cursor:pointer;flex:0 0 auto}
        .mobile-menu-toggle span{display:block;width:100%;height:2px;margin:6px 0;background:#f4f0e8;transition:transform .2s ease,opacity .2s ease}
        @media(max-width:720px){
          .nav-wrap{position:relative;min-height:92px;padding-top:10px;padding-bottom:10px}
          .brand-name{font-size:.8rem;letter-spacing:.14em}.brand-sub{font-size:.44rem;letter-spacing:.19em}
          .mobile-menu-toggle{display:block}
          .main-nav{display:none;position:absolute;top:calc(100% + 1px);left:-13px;right:-13px;z-index:60;padding:10px 20px 18px;background:#090909;border-bottom:1px solid rgba(209,174,71,.45);box-shadow:0 18px 30px rgba(0,0,0,.32)}
          .main-nav.mobile-open{display:flex;flex-direction:column;align-items:stretch;gap:0}
          .main-nav.mobile-open>a:not(.btn){display:block!important;padding:15px 4px;border-bottom:1px solid rgba(255,255,255,.1);color:#f4f0e8;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase}
          .main-nav.mobile-open>a:not(.btn):nth-of-type(4){border-bottom:0}
          .main-nav.mobile-open>.desktop-quote,.main-nav>.desktop-quote,a.desktop-quote{display:none!important;visibility:hidden!important;position:absolute!important;pointer-events:none!important;width:0!important;height:0!important;padding:0!important;margin:0!important;border:0!important;overflow:hidden!important}
        }
      `}</style>
    </header>
  );
}
