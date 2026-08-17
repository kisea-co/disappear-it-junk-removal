import Link from 'next/link';

const items = [
  'Junk removal',
  'Eviction cleanouts',
  'Apartment cleanouts',
  'House cleanouts',
  'Construction debris removal',
  'Trash removal',
  'Furniture removal',
  'Appliance removal',
  'Garage + outdoor junk',
  'Commercial junk removal',
];

const pricing = [
  ['Minimum Charge', '$128', 'Smaller pickups and light loads.'],
  ['Half Truck', '$440', 'Medium-size cleanouts and multi-item removal.'],
  ['3/4 Truck', '$578', 'Larger jobs that need more than a half load.'],
  ['Full Truck', '$618', 'Full-load cleanouts and high-volume removal.'],
];

export default function ServicesPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Licensed + Insured</div><h1>WE HANDLE THE<br/><span>HEAVY STUFF.</span></h1><p>Fast, reliable and professional junk and trash removal throughout Metro Atlanta.</p></div></section>
<section className="section section-cream"><div className="container"><div className="eyebrow dark">Our Services</div><h2>WE DON&apos;T JUST TAKE IT.<br/>WE MAKE IT DISAPPEAR.</h2><div className="service-list">{items.map(item=><div className="service-item" key={item}>{item}</div>)}</div><p className="section-lead" style={{marginTop:28}}>And more. Not sure whether we can take something? Send a photo and we&apos;ll let you know.</p></div></section>
<section className="section pricing-section"><div className="container"><div className="pricing-heading"><div><div className="eyebrow">Pricing</div><h2>STRAIGHTFORWARD<br/>LOAD-BASED PRICING.</h2></div><p>Pricing is based on the volume of your items and the space they take up on the truck. Send photos for the most accurate quote.</p></div><div className="pricing-grid">{pricing.map(([label,price,copy])=><article key={label}><span>{label}</span><strong>{price}</strong><p>{copy}</p></article>)}</div><p className="pricing-note">Final pricing may vary based on volume, item type, access, disposal requirements and job conditions.</p><div className="hero-actions"><Link href="/contact" className="btn">Request a Quote →</Link></div></div></section>
</>}
