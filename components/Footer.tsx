import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">DISAPPEAR IT</div>
          <p>Junk & Trash Removal • Atlanta, GA</p>
        </div>
        <div>
          <p><a href="tel:+14705402892">(470) 540-2892</a></p>
          <p><a href="mailto:junkdisappears@gmail.com">junkdisappears@gmail.com</a></p>
        </div>
        <div>
          <Link href="/contact" className="btn btn-small">Get a Quote</Link>
        </div>
      </div>
    </footer>
  );
}
