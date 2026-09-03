import QuoteForm from './QuoteForm';

const rewardBanner = {display:'inline-flex',alignItems:'center',gap:'10px',margin:'22px 0 8px',padding:'13px 15px',background:'#0b0b0b',color:'#f4f0e8',borderLeft:'4px solid var(--gold)'} as const;

export default function ContactPage({searchParams}:{searchParams?:{trashketball?:string}}){
const gameReward:0|25|50 = searchParams?.trashketball === '50' ? 50 : searchParams?.trashketball === '25' ? 25 : 0;
return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Get a Quote</div><h1>WHAT DO YOU NEED<br/><span>GONE?</span></h1><p>Send the details. We&apos;ll take it from there.</p></div></section>
<section className="section section-cream"><div className="container"><div className="editorial-split"><div><div className="eyebrow dark">Quick Quote</div><h2>SHOW US<br/>THE JUNK.</h2>{gameReward > 0 && <div style={rewardBanner}><small>TRASHKETBALL REWARD</small><strong style={{fontSize:'1.7rem',lineHeight:1,color:'var(--gold-soft)'}}>${gameReward} OFF</strong><span>ANY LOAD SIZE</span></div>}<p className="section-lead">Tell us where the job is and what needs to be removed. We&apos;ll review the details, confirm availability and contact you with your free quote.</p><div className="hero-actions"><a className="btn btn-dark" href="tel:+14048579200">Call Us</a><a className="btn btn-dark" href="mailto:junkdisappears@gmail.com">Email Us</a></div></div><div><QuoteForm reward={gameReward}/></div></div></div></section>
</>}
