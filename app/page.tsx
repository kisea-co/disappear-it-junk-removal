import Link from 'next/link';

const services = [
  ['Furniture Removal','Couches, chairs, tables, dressers and other unwanted furniture.'],
  ['Mattress & Appliance Removal','Bulky household items hauled away without the headache.'],
  ['Household Junk','Boxes, clutter, move-out junk and everyday unwanted items.'],
  ['Garage & Outdoor Junk','Garage cleanouts, backyard junk, shed contents and bulk piles.'],
  ['Commercial Junk Removal','Apartment communities, property managers and businesses.'],
  ['Large-Volume Loads','From a few items to bigger loads when you need serious space back.'],
];

export default function HomePage(){
  return <>
    <section className="hero"><div className="container">
      <div className="eyebrow">Atlanta, GA Junk Removal</div>
      <h1>GOT JUNK?<br/>LET’S MAKE IT DISAPPEAR.</h1>
      <p>Fast, straightforward junk removal for homes and businesses in Atlanta. You point it out. We load it up. You get your space back.</p>
      <div className="hero-actions"><Link className="btn" href="/contact">Get a Free Quote</Link><a className="text-link" href="tel:+14705402892">Call (470) 540-2892</a></div>
    </div></section>

    <section className="section section-light"><div className="container">
      <div className="eyebrow">What do you need gone?</div><h2>Junk removal. That’s the lane.</h2>
      <p className="section-lead">From one bulky item to a full load, Disappear It handles the junk so you don’t have to.</p>
      <div className="cards">{services.map(([title,copy])=><article className="card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className="section"><div className="container">
      <div className="eyebrow">Real jobs. Real results.</div><h2>The junk was there. Now it’s not.</h2>
      <p className="section-lead">We’re building this section with real before-and-after photos from completed Disappear It jobs.</p>
      <div className="proof-grid"><div className="proof"><span>Residential Before + After</span></div><div className="proof"><span>Commercial Before + After</span></div></div>
      <div className="hero-actions"><Link className="btn" href="/our-work">See Our Work</Link></div>
    </div></section>

    <section className="section section-light"><div className="container">
      <div className="eyebrow">Commercial</div><h2>Junk removal for properties and businesses.</h2>
      <p className="section-lead">Apartment communities, property managers and commercial properties can call Disappear It for bulk-item and unwanted-junk removal.</p>
      <div className="hero-actions"><Link className="btn" href="/commercial">Commercial Services</Link></div>
    </div></section>

    <section className="section"><div className="container"><div className="eyebrow">How it works</div><h2>Send it. Quote it. Gone.</h2><div className="cards"><article className="card"><h3>1. Show us the junk</h3><p>Send photos and your Atlanta-area location.</p></article><article className="card"><h3>2. Get your quote</h3><p>We’ll review the job and confirm pricing and availability.</p></article><article className="card"><h3>3. We haul it away</h3><p>We show up, load it, and make your space usable again.</p></article></div></div></section>

    <section className="cta-band"><div className="container cta-flex"><div><div className="eyebrow" style={{color:'#111'}}>Atlanta, GA</div><h2>Ready to get rid of it?</h2></div><Link className="btn" href="/contact">Get a Free Quote</Link></div></section>
  </>;
}
