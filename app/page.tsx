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

export default function HomePage(){
  return <>
    <section className="hero hero-premium">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Atlanta, GA + Metro Area</div>
          <h1>GOT JUNK?<br/><span>MAKE IT DISAPPEAR.</span></h1>
          <p>Fast, professional junk removal with no unnecessary runaround. You point it out. We load it up. <strong>You&apos;ll never see it again.</strong></p>
          <div className="hero-actions">
            <Link className="btn" href="/contact">Get a Free Quote</Link>
            <a className="btn btn-ghost" href="tel:+14705402892">Call (470) 540-2892</a>
          </div>
        </div>
        <div className="hero-media" aria-label="Reserved for real Disappear It loaded-truck photo">
          <div className="media-label">REAL DISAPPEAR IT JOB PHOTO</div>
        </div>
      </div>
    </section>

    <section className="trust-strip">
      <div className="container trust-grid">
        <span>Residential</span><span>Commercial</span><span>Single Items</span><span>Full Loads</span>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div className="section-heading split-heading">
          <div><div className="eyebrow">What We Take</div><h2>Junk removal.<br/>That&apos;s the lane.</h2></div>
          <p className="section-lead">From one bulky item to a serious cleanout, Disappear It handles the hauling so you can get your space back.</p>
        </div>
        <div className="service-bento">
          {services.map(([title,copy],i)=><article className={`service-card service-card-${i+1}`} key={title}><span className="service-num">0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className="inline-link"><Link href="/services">View all junk removal services →</Link></div>
      </div>
    </section>

    <section className="section process-section">
      <div className="container">
        <div className="eyebrow">How It Works</div>
        <h2>Simple in. Gone out.</h2>
        <div className="process-grid">
          <article><span>01</span><h3>Show us the junk.</h3><p>Send photos, your location and a quick description of what needs to go.</p></article>
          <article><span>02</span><h3>Get your quote.</h3><p>We review the job and confirm pricing and availability.</p></article>
          <article><span>03</span><h3>We make it disappear.</h3><p>We show up, load it and haul it away. That&apos;s it.</p></article>
        </div>
      </div>
    </section>

    <section className="section section-dark-alt">
      <div className="container">
        <div className="section-heading split-heading">
          <div><div className="eyebrow">Real Work</div><h2>You&apos;ll never<br/>see it again.</h2></div>
          <div><p className="section-lead">Real before-and-after work from jobs across Metro Atlanta. No stock-photo fairy tales over here.</p><Link className="btn btn-outline" href="/our-work">See Our Work</Link></div>
        </div>
        <div className="work-showcase">
          <div className="work-large"><span>Residential Before + After</span></div>
          <div className="work-stack"><div><span>Loaded Truck</span></div><div><span>Commercial Removal</span></div></div>
        </div>
      </div>
    </section>

    <section className="commercial-band">
      <div className="container commercial-grid">
        <div><div className="eyebrow eyebrow-dark">Commercial Junk Removal</div><h2>Property managers have junk too.</h2></div>
        <div><p>Apartment communities, property managers and businesses can call Disappear It for bulk-item and unwanted-junk removal without turning it into a whole production.</p><Link className="btn btn-dark" href="/commercial">Commercial Services</Link></div>
      </div>
    </section>

    <section className="section service-area-section">
      <div className="container">
        <div className="section-heading split-heading">
          <div><div className="eyebrow">Service Area</div><h2>All around the<br/>Atlanta metro.</h2></div>
          <p className="section-lead">We frequently serve the areas below, but we&apos;re not limited to this list. If you&apos;re in or around Metro Atlanta, send us your location and let&apos;s see if we can get you on the schedule.</p>
        </div>
        <div className="area-grid">{serviceAreas.map(area=><span key={area}>{area}</span>)}</div>
      </div>
    </section>

    <section className="cta-band cta-premium">
      <div className="container cta-grid">
        <div><div className="eyebrow eyebrow-dark">Ready When You Are</div><h2>What do you need gone?</h2><p>Send a photo. Get a quote. Get your space back.</p></div>
        <div className="cta-actions"><Link className="btn btn-dark" href="/contact">Get a Free Quote</Link><a className="cta-phone" href="tel:+14705402892">(470) 540-2892</a></div>
      </div>
    </section>
  </>;
}
