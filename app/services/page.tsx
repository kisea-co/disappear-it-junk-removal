import Link from 'next/link';

const items = ['Furniture removal','Mattress removal','Appliance removal','Household junk','Garage junk','Outdoor junk','Bulk-item removal','Move-out junk','Large-volume junk','Commercial junk removal'];

export default function ServicesPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Services</div><h1>JUNK REMOVAL, SIMPLE.</h1><p>One clear service: getting unwanted junk out of your way.</p></div></section>
<section className="section section-light"><div className="container"><h2>What we remove</h2><div className="service-list">{items.map(item=><div className="service-item" key={item}><strong>{item}</strong></div>)}</div><p className="section-lead" style={{marginTop:28}}>Not sure whether we can take something? Send a photo and we’ll let you know.</p><div className="hero-actions"><Link href="/contact" className="btn">Request a Quote</Link></div></div></section>
</>}
