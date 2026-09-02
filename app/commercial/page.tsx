import Link from 'next/link';

const commercialResults = [
  {
    title: 'Storage Unit Cleanout',
    before: '/images/storage-unit-cleanout-before.png',
    after: '/images/storage-unit-cleanout-after.png',
  },
  {
    title: 'Storage Cleanout',
    before: '/images/storage-box-cleanout-before.png',
    after: '/images/storage-box-cleanout-after.png',
  },
];

export default function CommercialPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Commercial Junk Removal</div><h1>JUNK DOESN&apos;T WAIT.<br/><span>NEITHER DO WE.</span></h1><p>Reliable junk removal for apartment communities, property managers, commercial spaces and larger-volume jobs across Metro Atlanta.</p></div></section>
<section className="section section-cream"><div className="container"><div className="editorial-split"><div><div className="eyebrow dark">Who We Work With</div><h2>BUILT FOR<br/>BUSINESS.</h2></div><div className="service-list-editorial"><article><span>01</span><div><h3>Apartment Communities</h3><p>Bulk furniture, abandoned items and unwanted junk around the property.</p></div></article><article><span>02</span><div><h3>Property Managers</h3><p>Fast removal when units, common areas or turn-ready spaces need junk gone.</p></div></article><article><span>03</span><div><h3>Businesses</h3><p>One-time or recurring junk removal for commercial spaces and larger loads.</p></div></article><article><span>04</span><div><h3>Real Estate + Turnovers</h3><p>Junk removal that helps get spaces cleared and ready for what comes next.</p></div></article></div></div><div className="hero-actions" style={{marginTop:40}}><Link href="/contact" className="btn">Request Commercial Quote →</Link></div></div></section>

<section className="section work-section"><div className="container"><div style={{maxWidth:'720px',marginBottom:'48px'}}><div className="eyebrow">Cleanout Results</div><h2>SPACE CLEARED.<br/>JOB DONE.</h2><p className="section-lead">Before and after results from storage and larger-volume cleanout jobs.</p></div><div className="project-gallery">{commercialResults.map((job)=><article className="project" key={job.title}><div className="project-title"><h2>{job.title}</h2></div><div className="before-after"><figure className="project-photo"><img src={job.before} alt={`${job.title} before`}/></figure><figure className="project-photo"><img src={job.after} alt={`${job.title} after`}/></figure></div></article>)}</div><div className="hero-actions" style={{marginTop:'48px'}}><Link href="/contact" className="btn">Request Commercial Quote →</Link><Link href="/our-work" className="btn">See More Work →</Link></div></div></section>
</>}
