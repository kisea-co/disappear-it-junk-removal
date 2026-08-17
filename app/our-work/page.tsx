import Link from 'next/link';

export default function OurWorkPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Work</div><h1>THE JUNK WAS THERE.<br/><span>NOW IT&apos;S NOT.</span></h1><p>Real before-and-after work from completed Disappear It jobs around Metro Atlanta.</p></div></section>
<section className="section work-section"><div className="container"><div className="work-showcase"><div className="work-large"><span>Residential cleanout — before + after</span></div><div className="work-stack"><div><span>Driveway junk removal</span></div><div><span>Commercial junk removal</span></div></div></div><div className="work-showcase" style={{marginTop:14}}><div className="work-large"><span>Outdoor / backyard junk removal</span></div><div className="work-stack"><div><span>Garage cleanout</span></div><div><span>Loaded truck</span></div></div></div><p className="section-lead" style={{marginTop:28}}>These gallery spaces are ready for the real job photos once they&apos;re uploaded to the repo.</p><div className="hero-actions"><Link href="/contact" className="btn">Get a Quote →</Link></div></div></section>
</>}
