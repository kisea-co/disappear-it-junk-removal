import Link from 'next/link';

const projects = [
  {
    title: 'Dunwoody Crossing Cleanout',
    location: 'Dunwoody, GA',
    before: '/images/dunwoody-cleanout-before.png',
    after: '/images/dunwoody-cleanout-after.png',
    extra: '/images/dunwoody-crossing.PNG',
  },
  {
    title: 'Residential Junk Removal',
    location: 'Hapeville, GA',
    before: '/images/hapeville-junk-removal-before.png',
    after: '/images/hapeville-junk-removal-after.png',
  },
  {
    title: 'Residential Moving Cleanout',
    location: 'Metro Atlanta',
    before: '/images/residential-moving-cleanout-before.png',
    after: '/images/residential-moving-cleanout-after.png',
  },
  {
    title: 'Shed Cleanout',
    location: 'Metro Atlanta',
    before: '/images/shed-cleanout-before.png',
    after: '/images/shed-cleanout-after.png',
  },
];

export default function OurWorkPage(){return <>
<section className="page-hero" style={{paddingTop:'72px',paddingBottom:'72px'}}><div className="container"><div style={{maxWidth:'760px'}}><div className="eyebrow">Our Work</div><h1>THE JUNK WAS THERE.<br/><span>NOW IT&apos;S NOT.</span></h1><p>Real completed Disappear It jobs from around Metro Atlanta.</p></div></div></section>

<section className="section work-section" style={{paddingTop:'78px'}}><div className="container"><div style={{maxWidth:'720px',marginBottom:'56px'}}><div className="eyebrow">Completed Jobs</div><h2>CLEAN WORK.<br/>CLEAR RESULTS.</h2><p className="section-lead">Real results from residential cleanouts, property cleanups and junk removal jobs across Metro Atlanta.</p></div>

<div className="project-gallery">
{projects.map((project,index)=><article className="project" key={project.title}>
  <div className="project-title"><div><span>Project 0{index+1}</span><h2>{project.title}</h2></div><span>{project.location}</span></div>
  {project.extra && <figure className="project-photo" style={{margin:'0 0 18px'}}><img src={project.extra} alt="Disappear It on site at Dunwoody Crossing"/></figure>}
  <div className="before-after">
    <figure className="project-photo"><img src={project.before} alt={`${project.title} before junk removal`}/></figure>
    <figure className="project-photo"><img src={project.after} alt={`${project.title} after junk removal`}/></figure>
  </div>
</article>)}
</div>

<div className="single-work-feature"><div className="project-title"><div><span>On the Job</span><h2>Loaded. Hauled. Gone.</h2></div></div><div className="before-after"><figure className="project-photo"><img src="/images/loaded-truck-haul.png" alt="Loaded Disappear It junk removal truck ready for haul away"/></figure><figure className="project-photo"><img src="/images/unloaded-truck.PNG" alt="Disappear It truck unloaded after haul away"/></figure></div></div>

<div className="hero-actions" style={{marginTop:'54px'}}><Link href="/contact" className="btn">Get a Quote →</Link></div></div></section>
</>}
