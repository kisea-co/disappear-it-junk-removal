import Link from 'next/link';

export default function OurWorkPage(){return <>
<section className="page-hero" style={{paddingTop:'72px',paddingBottom:'72px'}}><div className="container"><div style={{maxWidth:'760px'}}><div className="eyebrow">Our Work</div><h1>THE JUNK WAS THERE.<br/><span>NOW IT&apos;S NOT.</span></h1><p>Real completed Disappear It jobs from around Metro Atlanta.</p></div></div></section>
<section className="section work-section"><div className="container"><div style={{maxWidth:'720px'}}><div className="eyebrow">Completed Jobs</div><h2>CLEAN WORK.<br/>CLEAR RESULTS.</h2><p className="section-lead">Our before-and-after gallery is being refreshed with clean, side-by-side job photos with no photo overlays or brand marks.</p></div><div className="hero-actions" style={{marginTop:'36px'}}><Link href="/contact" className="btn">Get a Quote →</Link></div></div></section>
</>}
