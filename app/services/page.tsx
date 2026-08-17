import Link from 'next/link';

const items = ['Furniture removal','Mattress removal','Appliance removal','Household junk','Garage junk','Outdoor junk','Bulk-item removal','Move-out junk','Large-volume junk','Commercial junk removal'];
const pricing = [
  ['Minimum Service', '$125', 'Smaller pickups and light loads.'],
  ['Half Truck Load', '$420', 'Medium-size cleanouts and multi-item removal.'],
  ['Full Truck Load', 'From $600', 'Larger cleanouts and high-volume removal.'],
];

export default function ServicesPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Services</div><h1>JUNK REMOVAL.<br/><span>THAT&apos;S THE LANE.</span></h1><p>One clear service: getting unwanted junk out of your way.</p></div></section>
<section className="section section-cream"><div className="container"><div className="eyebrow dark">What We Remove</div><h2>FROM ONE ITEM<br/>TO A FULL LOAD.</h2><div className="service-list">{items.map(item=><div className="service-item" key={item}>{item}</div>)}</div><p className="section-lead" style={{marginTop:28}}>Not sure whether we can take something? Send a photo and we&apos;ll let you know.</p></div></section>
<section className="section pricing-section"><div className="container"><div className="pricing-heading"><div><div className="eyebrow">Pricing</div><h2>STRAIGHTFORWARD<br/>LOAD-BASED PRICING.</h2></div><p>Pricing is based on the volume of your items and the space they take up on the truck. We stack each load efficiently so your quote reflects the space actually used.</p></div><div className="pricing-grid">{pricing.map(([label,price,copy])=><article key={label}><span>{label}</span><strong>{price}</strong><p>{copy}</p></article>)}</div><p className="pricing-note">Final pricing may vary based on item type, access, disposal requirements and job conditions. Send photos for the most accurate quote.</p><div className="hero-actions"><Link href="/contact" className="btn">Request a Quote →</Link></div></div></section>
</>}
