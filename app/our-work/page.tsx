import Link from 'next/link';

const projects = [
  {title:'Closet Cleanout', before:'/images/closet-cleanout-before.PNG', after:'/images/closet-cleanout-after.PNG'},
  {title:'Junk Pile Cleanout', before:'/images/junk-pile-cleanout-before.jpg', after:'/images/junk-pile-cleanout-after.jpg'},
  {title:'Dunwoody Cleanout', before:'/images/dunwoody-cleanout-before.PNG', after:'/images/dunwoody-cleanout-after.PNG'},
  {title:'Move-Out Cleanout', before:'/images/move-out-before.png', after:'/images/move-out-after.png'},
  {title:'Driveway Cleanout', before:'/images/driveway-cleanout-before.PNG', after:'/images/driveway-cleanout-after.PNG'},
  {title:'Driveway Cleanout II', before:'/images/driveway-cleanout-before-02.PNG', after:'/images/driveway-cleanout-after-02.PNG'},
  {title:'Deck Junk Removal', before:'/images/deck-junk-removal-before.PNG', after:'/images/deck-junk-removal-after.PNG'},
];

export default function OurWorkPage(){return <>
<section className="page-hero"><div className="container"><div className="eyebrow">Our Work</div><h1>THE JUNK WAS THERE.<br/><span>NOW IT&apos;S NOT.</span></h1><p>Real before-and-after work from completed Disappear It jobs around Metro Atlanta.</p></div></section>
<section className="section work-section"><div className="container"><div className="project-gallery">{projects.map(project=><article className="project" key={project.title}><div className="project-title"><span>Completed Job</span><h2>{project.title}</h2></div><div className="before-after"><figure><div className="project-photo" style={{aspectRatio:'3 / 4',overflow:'hidden'}}><img src={project.before} alt={`${project.title} before junk removal`} style={{width:'100%',height:'100%',objectFit:'cover'}}/><span>Before</span></div></figure><figure><div className="project-photo" style={{aspectRatio:'3 / 4',overflow:'hidden'}}><img src={project.after} alt={`${project.title} after junk removal`} style={{width:'100%',height:'100%',objectFit:'cover'}}/><span>After</span></div></figure></div></article>)}</div><div className="single-work-feature"><div className="photo-card"><img src="/images/loaded-truck-before.png" alt="Loaded Disappear It junk removal truck"/><span>Loaded up. Hauled out.</span></div></div><div className="hero-actions"><Link href="/contact" className="btn">Get a Quote →</Link></div></div></section>
</>}
