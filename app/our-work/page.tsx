import Link from 'next/link';

const projects = [
  {
    title: 'Property Management Cleanout',
    before: '/images/dunwoody-cleanout-before.png',
    after: '/images/dunwoody-cleanout-after.png',
    extra: '/images/dunwoody-crossing.PNG',
  },
  {
    title: 'Commercial Cleanout',
    before: '/images/backyard-cleanout-before.png',
    after: '/images/backyard-cleanout-after.png',
  },
  {
    title: 'Residential Moving Cleanout',
    before: '/images/residential-moving-cleanout-before.png',
    after: '/images/residential-moving-cleanout-after.png',
  },
  {
    title: 'Shed Cleanout',
    before: '/images/shed-cleanout-before.png',
    after: '/images/shed-cleanout-after.png',
  },
  {
    title: 'Shed Demolition',
    before: '/images/shed-demolition-before.png',
    after: '/images/shed-demoliton-after.png',
  },
];

export default function OurWorkPage(){return <>
<section className="page-hero" style={{paddingTop:'72px',paddingBottom:'72px'}}><div className="container"><div style={{maxWidth:'760px'}}><div className="eyebrow">Our Work</div><h1>THE JUNK WAS THERE.<br/><span>NOW IT&apos;S NOT.</span></h1><p>Real completed jobs by Disappear It Junk & Trash Removal LLC from around Metro Atlanta.</p></div></div></section>

<section className="section work-section" style={{paddingTop:'78px'}}><div className="container"><div style={{maxWidth:'720px',marginBottom:'56px'}}><div className="eyebrow">Completed Jobs</div><h2>CLEAN WORK.<br/>CLEAR RESULTS.</h2><p className="section-lead">Real results from residential cleanouts, property cleanups and junk removal jobs across Metro Atlanta.</p></div>

<div className="project-gallery">
{projects.map((project)=><article className="project" key={project.title}>
  <div className="project-title"><h2>{project.title}</h2></div>
  {project.extra && <figure className="project-photo" style={{margin:'0 0 18px'}}><img src={project.extra} alt="Disappear It Junk & Trash Removal LLC junk removal job"/></figure>}
  <div className="before-after">
    <figure className="project-photo"><img src={project.before} alt={`${project.title} job photo`}/></figure>
    <figure className="project-photo"><img src={project.after} alt={`${project.title} completed job photo`}/></figure>
  </div>
</article>)}
</div>

<div className="single-work-feature"><div className="before-after"><figure className="project-photo"><img src="/images/loaded-truck-haul.png" alt="Disappear It Junk & Trash Removal LLC junk removal truck"/></figure><figure className="project-photo"><img src="/images/unloaded-truck.PNG" alt="Disappear It Junk & Trash Removal LLC junk removal truck after haul away"/></figure></div></div>

<div className="hero-actions" style={{marginTop:'54px'}}><Link href="/contact" className="btn">Get a Quote →</Link></div></div></section>
</>}
