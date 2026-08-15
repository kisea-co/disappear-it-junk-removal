import Link from 'next/link';

export default function CommercialPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Commercial Junk Removal</div><h1>JUNK REMOVAL FOR PROPERTIES & BUSINESSES.</h1><p>Reliable removal for apartment communities, property managers, commercial spaces and larger-volume jobs.</p></div></section>
<section className="section section-light"><div className="container"><h2>Built for the jobs that pile up fast.</h2><div className="cards"><article className="card"><h3>Apartment Communities</h3><p>Bulk furniture, abandoned items and unwanted junk around the property.</p></article><article className="card"><h3>Property Managers</h3><p>Fast removal when units or common areas need junk gone.</p></article><article className="card"><h3>Businesses</h3><p>One-time or recurring junk removal for commercial spaces.</p></article></div><p className="section-lead" style={{marginTop:30}}>Past commercial work includes an apartment-community junk removal project at Dunwoody Crossings.</p><div className="hero-actions"><Link href="/contact" className="btn">Request Commercial Quote</Link></div></div></section>
</>}
