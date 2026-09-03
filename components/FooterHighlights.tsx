import ServicesStrip from './ServicesStrip';

const TrustIcon = ({type}:{type:'shield'|'home'|'building'|'pin'}) => {
  if(type==='shield') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 26 7v7c0 7-4 12-10 15C10 26 6 21 6 14V7l10-4Z"/><path d="m11.5 15.5 3 3 6-7"/></svg>;
  if(type==='home') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m4 15 12-10 12 10"/><path d="M7 13v15h18V13"/><path d="M13 28v-8h6v8"/></svg>;
  if(type==='building') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 28V5h18v23"/><path d="M4 28h24M11 10h3M18 10h3M11 15h3M18 15h3M11 20h3M18 20h3"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 1 1 20 0Z"/><circle cx="16" cy="13" r="3"/></svg>;
};

export default function FooterHighlights(){return <>
  <section className="micro-strip trust-strip" aria-label="Why choose Disappear It"><div className="container micro-grid trust-grid"><div className="trust-item"><TrustIcon type="shield"/><div><strong>Licensed + Insured</strong><span>Professional. Reliable. Ready.</span></div></div><div className="trust-item"><TrustIcon type="home"/><div><strong>Residential</strong><span>Homeowners + Renters</span></div></div><div className="trust-item"><TrustIcon type="building"/><div><strong>Commercial</strong><span>Businesses + Property Teams</span></div></div><div className="trust-item"><TrustIcon type="pin"/><div><strong>Metro Atlanta</strong><span>Local + Surrounding Areas</span></div></div></div></section>
  <ServicesStrip />
</>}
