import Link from 'next/link';

const items = ['Junk removal','Eviction clean-outs','Apartment clean-outs','House clean-outs','Construction debris removal','Trash removal','Furniture removal','Appliance removal','Garage + outdoor junk','Commercial junk removal'];

const featuredJobs = [
  {
    title: 'Backyard Debris Cleanup',
    before: '/images/backyard-debris-before.png',
    after: '/images/backyard-debris-after.png',
  },
  {
    title: 'Basement Storage Cleanout',
    before: '/images/basement-storage-cleanout-before.png',
    after: '/images/basement-storage-cleanout-after.png',
  },
  {
    title: 'Patio + Deck Cleanout',
    before: '/images/patio-deck-cleanout-before.png',
    after: '/images/patio-deck-cleanout-after.png',
  },
  {
    title: 'Wood + Construction Debris Removal',
    before: '/images/wood-construction-debris-before.png',
    after: '/images/wood-construction-debris-after.png',
  },
];

export default function ServicesPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Services</div><h1>WE HANDLE THE<br/><span>HEAVY STUFF.</span></h1><p>Fast, reliable junk removal and clean-out services throughout Metro Atlanta.</p></div></section>
<section className="section section-cream"><div className="container"><div className="eyebrow dark">What We Remove</div><h2>JUNK, TRASH,<br/>CLEAN-OUTS + MORE.</h2><div className="service-list">{items.map(item=><div className="service-item" key={item}>{item}</div>)}</div><p className="section-lead" style={{marginTop:28}}>Don&apos;t see your job listed? Send us a photo and we&apos;ll let you know if we can take it.</p></div></section>

<section className="section work-section"><div className="container"><div style={{maxWidth:'720px',marginBottom:'48px'}}><div className="eyebrow">Recent Results</div><h2>FROM CLUTTERED<br/>TO CLEARED.</h2><p className="section-lead">A look at recent cleanouts, outdoor junk removal and debris hauling jobs.</p></div><div className="project-gallery">{featuredJobs.map((job)=><article className="project" key={job.title}><div className="project-title"><h2>{job.title}</h2></div><div className="before-after"><figure className="project-photo"><img src={job.before} alt={`${job.title} before`}/></figure><figure className="project-photo"><img src={job.after} alt={`${job.title} after`}/></figure></div></article>)}</div><div className="hero-actions" style={{marginTop:'48px'}}><Link href="/our-work" className="btn">See More Work →</Link></div></div></section>

<section className="section pricing-section"><div className="container"><div className="pricing-heading"><div><div className="eyebrow">Pricing</div><h2><span>PRICING STARTS<br/>AT $128.</span></h2></div><div><h3 style={{margin:'0 0 8px',fontSize:'1rem',fontWeight:500,color:'#f5f0e7'}}>Every job is different.</h3><p style={{margin:'0 0 22px'}}>Your quote is based primarily on how much space your items take up in our truck, plus the labor and disposal required to get it gone.</p><div style={{borderTop:'1px solid rgba(209,174,71,.28)',paddingTop:'18px'}}><div className="eyebrow" style={{marginBottom:'7px'}}>What does $128 look like?</div><p style={{margin:0}}>A washer + dryer pickup is one example of our starting load size.</p></div></div></div><div className="pricing-footer" style={{marginTop:'34px'}}><p className="pricing-note">Send us a picture of what you need removed or request a free estimate today.</p><div style={{display:'flex',gap:'14px',flexWrap:'wrap'}}><Link href="/contact" className="btn">Free Estimate →</Link><a href="tel:+14705402892" className="btn">Call Us</a></div></div></div></section>
</>}
