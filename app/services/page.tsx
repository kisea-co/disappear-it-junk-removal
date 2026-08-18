import Link from 'next/link';

const items = ['Junk removal','Eviction cleanouts','Apartment cleanouts','House cleanouts','Construction debris removal','Trash removal','Furniture removal','Appliance removal','Garage + outdoor junk','Commercial junk removal'];

export default function ServicesPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Services</div><h1>WE HANDLE THE<br/><span>HEAVY STUFF.</span></h1><p>Fast, reliable junk removal and cleanout services throughout Metro Atlanta.</p></div></section>
<section className="section section-cream"><div className="container"><div className="eyebrow dark">What We Remove</div><h2>JUNK, TRASH,<br/>CLEANOUTS + MORE.</h2><div className="service-list">{items.map(item=><div className="service-item" key={item}>{item}</div>)}</div><p className="section-lead" style={{marginTop:28}}>Don&apos;t see your job listed? Send us a photo and we&apos;ll let you know if we can take it.</p></div></section>
<section className="section pricing-section"><div className="container"><div className="pricing-heading"><div><div className="eyebrow">Quotes</div><h2>EVERY LOAD<br/>IS DIFFERENT.</h2></div><p>Pricing is based on the amount of space your items take up on the truck, along with item type, access and disposal requirements. Send us photos of what you need removed and we&apos;ll provide a quote for your job.</p></div><div className="pricing-footer" style={{marginTop:'34px'}}><p className="pricing-note">Fast quotes. No need to guess your load size.</p><Link href="/contact" className="btn">Get a Free Quote →</Link></div></div></section>
</>}
