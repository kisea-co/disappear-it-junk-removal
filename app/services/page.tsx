import Link from 'next/link';

const items = ['Junk removal','Eviction cleanouts','Apartment cleanouts','House cleanouts','Construction debris removal','Trash removal','Furniture removal','Appliance removal','Garage + outdoor junk','Commercial junk removal'];
const pricing = [['Minimum','$128','Small pickups + light loads'],['½ Truck','$440','Medium-size removals'],['¾ Truck','$578','Larger cleanouts'],['Full Truck','$618','Full-load removal']];

export default function ServicesPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Services</div><h1>WE HANDLE THE<br/><span>HEAVY STUFF.</span></h1><p>Fast, reliable junk removal and cleanout services throughout Metro Atlanta.</p></div></section>
<section className="section section-cream"><div className="container"><div className="eyebrow dark">What We Remove</div><h2>JUNK, TRASH,<br/>CLEANOUTS + MORE.</h2><div className="service-list">{items.map(item=><div className="service-item" key={item}>{item}</div>)}</div><p className="section-lead" style={{marginTop:28}}>Don&apos;t see your job listed? Send us a photo and we&apos;ll let you know if we can take it.</p></div></section>
<section className="section pricing-section"><div className="container"><div className="pricing-heading"><div><div className="eyebrow">Pricing</div><h2>LOAD-BASED.<br/>STRAIGHTFORWARD.</h2></div><p>Pricing is based on the space your items take up on the truck. Send photos for the most accurate quote.</p></div><div className="pricing-grid">{pricing.map(([label,price,copy])=><article key={label}><span>{label}</span><strong>{price}</strong><div className="price-rule"/><p>{copy}</p></article>)}</div><div className="pricing-footer"><p className="pricing-note">Pricing may vary based on item type, access, disposal requirements and job conditions.</p><Link href="/contact" className="btn">Get a Quote →</Link></div></div></section>
</>}
