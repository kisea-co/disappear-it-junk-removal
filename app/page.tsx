import Link from 'next/link';

const services = [
  ['Furniture Removal','Couches, chairs, tables, dressers, bed frames and other unwanted furniture.'],
  ['Mattresses & Appliances','Bulky household items hauled away without the headache.'],
  ['Household Junk','Boxes, clutter, move-out junk and everyday unwanted items.'],
  ['Garage & Outdoor Junk','Garage junk, backyard piles, shed contents and bulk items.'],
  ['Commercial Junk Removal','Reliable removal for apartment communities, property managers and businesses.'],
  ['Large-Volume Loads','A few items or a packed load — we make space fast.'],
];

const serviceAreas = [
  'Fayetteville, GA','Jonesboro, GA','Stockbridge, GA','McDonough, GA',
  'Morrow, GA','Fairburn, GA','Atlanta, GA','South Fulton, GA',
  'College Park, GA','Riverdale, GA','East Point, GA','Hapeville, GA',
];

const pricing = [
  ['Minimum Service', '$125', 'Ideal for smaller pickups. A washer + dryer is a typical minimum-load example.'],
  ['Half Truck Load', '$420', 'For medium-size cleanouts and multi-item removal.'],
  ['Full Truck Load', 'From $600', 'For larger cleanouts and high-volume junk removal.'],
];

export default function HomePage(){
  return <>
    <section className="hero urban-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Atlanta Junk Removal</div>
          <h1>WE MAKE JUNK<br/><span>DISAPPEAR.</span></h1>
          <p>Residential + commercial junk removal across Metro Atlanta. Fast, professional, and straight to the point.</p>
          <div className="brand-line">YOU&apos;LL NEVER SEE IT AGAIN.</div>
          <div className="hero-actions">
            <Link className="btn" href="/contact">Get a Free Quote →</Link>
            <a className="text-link" href="tel:+14705402892">Call (470) 540-2892</a>
          </div>
        </div>
        <div className="hero-media" aria-label="Reserved for real Disappear It loaded-truck photo">
          <span>REAL LOADED-TRUCK PHOTO</span>
        </div>
      </div>
    </section>

    <section className="micro-strip">
      <div className="container micro-grid">
        <span>Residential</span><span>Commercial</span><span>Single Items</span><span>Full Loads</span>
      </div>
    </section>

    <section className="section section-cream">
      <div className="container editorial-split">
        <div>
          <div className="eyebrow dark">What We Take</div>
          <h2>WHAT NEEDS<br/>TO GO?</h2>
        </div>
        <div className="service-list-editorial">
          {services.map(([title,copy],i)=><article key={title}>
            <span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div>
          </article>)}
          <Link className="editorial-link" href="/services">View all services →</Link>
        </div>
      </div>
    </section>

    <section className="section pricing-section">
      <div className="container">
        <div className="pricing-heading"><div><div className="eyebrow">Straightforward Pricing</div><h2>KNOW THE RANGE<br/>BEFORE WE PULL UP.</h2></div><p>Pricing is based on the volume of your items and the space they take up on the truck. Send photos for the most accurate quote.</p></div>
        <div className="pricing-grid">{pricing.map(([label,price,copy])=><article key={label}><span>{label}</span><strong>{price}</strong><p>{copy}</p></article>)}</div>
        <p className="pricing-note">Final pricing may vary based on volume, item type, access, disposal requirements, and job conditions.</p>
      </div>
    </section>

    <section className="section process-section">
      <div className="container">
        <div className="process-intro"><div className="eyebrow">How It Works</div><h2>THREE STEPS.<br/>THAT&apos;S IT.</h2></div>
        <div className="process-grid">
          <article><span>01</span><h3>Show us the junk.</h3><p>Send photos, your location and a quick description of what needs to go.</p></article>
          <article><span>02</span><h3>Get your quote.</h3><p>We review the job and confirm pricing and availability.</p></article>
          <article><span>03</span><h3>We make it disappear.</h3><p>We show up, load it and haul it away.</p></article>
        </div>
      </div>
    </section>

    <section className="section work-section">
      <div className="container">
        <div className="editorial-split work-heading">
          <div><div className="eyebrow">Real Work</div><h2>BEFORE.<br/>AFTER.</h2></div>
          <div><p className="section-lead">Real Disappear It jobs from around Metro Atlanta. No stock-photo fairy tales.</p><Link className="editorial-link light" href="/our-work">See our work →</Link></div>
        </div>
        <div className="work-showcase editorial-gallery">
          <div className="work-large"><span>Residential before + after</span></div>
          <div className="work-stack"><div><span>Loaded truck</span></div><div><span>Commercial removal</span></div></div>
        </div>
      </div>
    </section>

    <section className="commercial-section">
      <div className="container commercial-grid">
        <div><div className="eyebrow dark">Commercial Junk Removal</div><h2>JUNK DOESN&apos;T WAIT.<br/>NEITHER DO WE.</h2></div>
        <div><p>Apartment communities, property managers and businesses can call Disappear It for unwanted furniture, bulk items and junk removal without turning it into a whole production.</p><Link className="btn btn-dark" href="/commercial">Commercial Services →</Link></div>
      </div>
    </section>

    <section className="section area-section">
      <div className="container editorial-split">
        <div><div className="eyebrow">Service Area</div><h2>METRO ATLANTA<br/>AND BEYOND.</h2><p className="section-lead">These are some of the areas we serve most often. We are not limited to this list — send your location and we&apos;ll let you know if we can get you on the schedule.</p></div>
        <div className="area-list">{serviceAreas.map(area=><span key={area}>{area}</span>)}</div>
      </div>
    </section>

    <section className="final-cta">
      <div className="container cta-grid">
        <div><div className="eyebrow dark">Disappear It</div><h2>WHAT DO YOU NEED GONE?</h2><p>Send a photo. Get a quote. Get your space back.</p></div>
        <div className="cta-actions"><Link className="btn btn-dark" href="/contact">Get a Free Quote →</Link><a className="cta-phone" href="tel:+14705402892">(470) 540-2892</a></div>
      </div>
    </section>
  </>;
}
