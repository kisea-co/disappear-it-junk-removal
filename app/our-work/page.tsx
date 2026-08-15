import Link from 'next/link';

export default function OurWorkPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Work</div><h1>REAL JOBS. REAL RESULTS.</h1><p>Before-and-after proof from completed junk removal jobs around the Atlanta area.</p></div></section>
<section className="section"><div className="container"><div className="proof-grid"><div className="proof"><span>Residential Cleanout</span></div><div className="proof"><span>Driveway Junk Removal</span></div><div className="proof"><span>Outdoor Junk Removal</span></div><div className="proof"><span>Commercial Junk Removal</span></div></div><p className="section-lead" style={{marginTop:28}}>The final gallery will use Disappear It’s real job photos, cleaned up and formatted consistently for the site.</p><div className="hero-actions"><Link href="/contact" className="btn">Get a Quote</Link></div></div></section>
</>}
