import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project Portfolio | Disappear It Junk & Trash Removal LLC',
  description: 'View completed property management, commercial, residential, demolition, and storage cleanout projects across Metro Atlanta.',
};

type Project = {
  title: string;
  location?: string;
  description: string;
  before: string;
  after: string;
};

const propertyManagement: Project[] = [
  {
    title: 'Dunwoody Crossing Property Cleanout',
    location: 'Dunwoody, Georgia',
    description: 'Property cleanout and hauling completed for a Metro Atlanta property-management client.',
    before: '/images/dunwoody-cleanout-before.png',
    after: '/images/dunwoody-cleanout-after.png',
  },
  {
    title: 'Hapeville Eviction Cleanout',
    location: 'Hapeville, Georgia',
    description: 'Eviction cleanout completed to help return the property to a cleared, workable condition.',
    before: '/images/hapeville-junk-removal-before.png',
    after: '/images/hapeville-junk-removal-after.png',
  },
];

const commercial: Project[] = [
  {
    title: 'Commercial Metal & Debris Cleanout',
    description: 'Removal of accumulated metal and miscellaneous debris from a commercial property.',
    before: '/images/backyard-cleanout-before.png',
    after: '/images/backyard-cleanout-after.png',
  },
];

const residential: Project[] = [
  {
    title: 'Residential Moving Cleanout',
    description: 'Household contents and unwanted items removed during a residential move.',
    before: '/images/residential-moving-cleanout-before.png',
    after: '/images/residential-moving-cleanout-after.png',
  },
  {
    title: 'Basement & Storage Cleanout',
    description: 'Stored items and household clutter cleared to restore usable space.',
    before: '/images/basement-storage-cleanout-before.png',
    after: '/images/basement-storage-cleanout-after.png',
  },
  {
    title: 'Patio & Deck Cleanout',
    description: 'Outdoor furniture, junk, and debris removed from a residential patio and deck area.',
    before: '/images/patio-deck-cleanout-before.png',
    after: '/images/patio-deck-cleanout-after.png',
  },
];

const demolition: Project[] = [
  {
    title: 'Shed Demolition',
    description: 'Small-structure demolition followed by complete debris removal.',
    before: '/images/shed-demolition-before.png',
    after: '/images/shed-demoliton-after.png',
  },
  {
    title: 'Shed Cleanout',
    description: 'Contents removed and the shed cleared for its next use.',
    before: '/images/shed-cleanout-before.png',
    after: '/images/shed-cleanout-after.png',
  },
  {
    title: 'Construction Debris Removal',
    description: 'Wood and non-hazardous construction debris collected and hauled away.',
    before: '/images/wood-construction-debris-before.png',
    after: '/images/wood-construction-debris-after.png',
  },
  {
    title: 'Outdoor Debris Removal',
    description: 'Bulk outdoor debris removed to leave the area clear and accessible.',
    before: '/images/backyard-debris-before.png',
    after: '/images/backyard-debris-after.png',
  },
];

const additional: Project[] = [
  {
    title: 'Storage Box Cleanout',
    description: 'Stored contents removed and the container cleared.',
    before: '/images/storage-box-cleanout-before.png',
    after: '/images/storage-box-cleanout-after.png',
  },
  {
    title: 'Storage Unit Cleanout',
    description: 'Unwanted contents removed from a storage unit.',
    before: '/images/storage-unit-cleanout-before.png',
    after: '/images/storage-unit-cleanout-after.png',
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="portfolio-card">
      <div className="portfolio-card-copy">
        <div>
          {project.location && <span className="project-location">{project.location}</span>}
          <h3>{project.title}</h3>
        </div>
        <p>{project.description}</p>
      </div>
      <div className="comparison-grid">
        <figure>
          <div className="photo-label">Before</div>
          <img src={project.before} alt={`${project.title} before service`} loading="lazy" />
        </figure>
        <figure>
          <div className="photo-label after">After</div>
          <img src={project.after} alt={`${project.title} after service`} loading="lazy" />
        </figure>
      </div>
    </article>
  );
}

function PortfolioSection({
  number,
  eyebrow,
  title,
  intro,
  projects,
  tone = 'dark',
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  projects: Project[];
  tone?: 'dark' | 'light';
}) {
  return (
    <section className={`portfolio-section portfolio-${tone}`}>
      <div className="container">
        <div className="portfolio-section-heading">
          <div>
            <span className="section-number">{number}</span>
            <div className={`eyebrow ${tone === 'light' ? 'dark' : ''}`}>{eyebrow}</div>
            <h2>{title}</h2>
          </div>
          <p>{intro}</p>
        </div>
        <div className="portfolio-projects">
          {projects.map(project => <ProjectCard key={project.title} project={project} />)}
        </div>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <section className="portfolio-hero">
        <div className="portfolio-hero-image" aria-hidden="true" />
        <div className="portfolio-hero-shade" aria-hidden="true" />
        <div className="container portfolio-hero-inner">
          <img className="portfolio-logo" src="/images/disappear-it-logo.png" alt="Disappear It Junk & Trash Removal LLC" />
          <div className="portfolio-hero-copy">
            <div className="eyebrow">Completed Projects · Metro Atlanta</div>
            <h1>THE WORK<br /><span>SPEAKS FOR ITSELF.</span></h1>
            <p>Real before-and-after transformations from property-management, commercial, residential, and debris-removal jobs.</p>
            <div className="portfolio-hero-actions">
              <a className="btn" href="#property-management">View Our Work ↓</a>
              <Link className="portfolio-text-link" href="/contact">Request a Quote →</Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="portfolio-jump" aria-label="Portfolio categories">
        <div className="container">
          <a href="#property-management">Property Management</a>
          <a href="#commercial">Commercial</a>
          <a href="#residential">Residential</a>
          <a href="#demolition">Demolition & Debris</a>
          <a href="#additional">Storage</a>
        </div>
      </nav>

      <div id="property-management">
        <PortfolioSection
          number="01"
          eyebrow="Property Management"
          title="TURNOVERS WITHOUT THE HOLDUP."
          intro="Cleanouts that help property teams move from vacancy, eviction, or accumulated debris to a cleared space ready for what comes next."
          projects={propertyManagement}
          tone="light"
        />
      </div>

      <div id="commercial">
        <PortfolioSection
          number="02"
          eyebrow="Commercial"
          title="BIG JOBS. CLEAN FINISH."
          intro="Responsive removal support for businesses and commercial properties throughout Metro Atlanta."
          projects={commercial}
        />
      </div>

      <div id="residential">
        <PortfolioSection
          number="03"
          eyebrow="Residential"
          title="GET YOUR SPACE BACK."
          intro="Moving, storage, and outdoor cleanouts handled with care from the first item to the final sweep."
          projects={residential}
          tone="light"
        />
      </div>

      <div id="demolition">
        <PortfolioSection
          number="04"
          eyebrow="Demolition & Debris"
          title="WE CLEAR WHAT'S LEFT."
          intro="Small demolition, shed cleanouts, and non-hazardous construction or outdoor debris removal."
          projects={demolition}
        />
      </div>

      <div id="additional">
        <PortfolioSection
          number="05"
          eyebrow="Additional Projects"
          title="STORAGE, CLEARED."
          intro="From packed storage boxes to full units, we remove unwanted contents and leave usable space behind."
          projects={additional}
          tone="light"
        />
      </div>

      <section className="portfolio-cta">
        <div className="container portfolio-cta-grid">
          <div>
            <div className="eyebrow dark">Your project can be next</div>
            <h2>READY TO MAKE IT DISAPPEAR?</h2>
            <p>Send the location, photos or videos, and your preferred service date to start your free quote.</p>
          </div>
          <div className="portfolio-cta-actions">
            <Link className="btn btn-dark" href="/contact">Get a Free Quote →</Link>
            <a href="tel:+14048579200">404-857-9200</a>
          </div>
        </div>
      </section>

      <style>{`
        .portfolio-hero{position:relative;min-height:680px;display:flex;align-items:flex-end;overflow:hidden;background:#080808;border-bottom:1px solid var(--line)}
        .portfolio-hero-image{position:absolute;inset:0;background:url('/images/dunwoody-crossing.PNG') center/cover no-repeat;filter:saturate(.75) contrast(1.05)}
        .portfolio-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,5,.92) 0%,rgba(5,5,5,.76) 42%,rgba(5,5,5,.28) 76%),linear-gradient(0deg,rgba(5,5,5,.9) 0%,transparent 58%)}
        .portfolio-hero-inner{position:relative;z-index:1;padding-top:42px;padding-bottom:72px}
        .portfolio-logo{position:absolute;top:42px;left:0;width:190px;height:auto;filter:drop-shadow(0 4px 15px rgba(0,0,0,.45))}
        .portfolio-hero-copy{max-width:760px;padding-top:125px}
        .portfolio-hero h1{font-family:var(--font-display),Impact,sans-serif;font-size:clamp(4.2rem,8vw,8.2rem);line-height:.82;letter-spacing:-.035em;margin:16px 0 26px;text-transform:uppercase}
        .portfolio-hero h1 span{color:var(--gold-soft)}
        .portfolio-hero p{max-width:650px;color:#d1cabf;font-size:1rem;margin:0}
        .portfolio-hero-actions{display:flex;align-items:center;gap:26px;margin-top:30px;flex-wrap:wrap}
        .portfolio-text-link{font-size:.76rem;text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid rgba(255,255,255,.45);padding-bottom:4px}
        .portfolio-jump{position:sticky;top:70px;z-index:35;background:rgba(9,9,9,.96);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}
        .portfolio-jump .container{display:flex;gap:30px;align-items:center;min-height:54px;overflow-x:auto;scrollbar-width:none}
        .portfolio-jump a{font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;color:#c8c1b7}
        .portfolio-jump a:hover{color:var(--gold-soft)}
        .portfolio-section{padding:88px 0 100px;scroll-margin-top:120px}
        .portfolio-dark{background:#0c0c0c;color:#f4f0e8}
        .portfolio-light{background:var(--paper);color:#111}
        .portfolio-section-heading{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:70px;align-items:end;padding-bottom:42px;border-bottom:1px solid currentColor}
        .portfolio-section-heading>div{position:relative}
        .section-number{position:absolute;right:0;top:-24px;font-family:var(--font-display);font-size:5rem;line-height:1;color:var(--gold);opacity:.16}
        .portfolio-section h2,.portfolio-cta h2{font-family:var(--font-display),Impact,sans-serif;font-size:clamp(3.2rem,6vw,6rem);line-height:.88;letter-spacing:-.025em;text-transform:uppercase;margin:12px 0 0}
        .portfolio-section-heading p{margin:0;color:#8a8278;max-width:470px}
        .portfolio-dark .portfolio-section-heading p{color:#b9b1a6}
        .portfolio-projects{display:grid;gap:70px;margin-top:54px}
        .portfolio-card{border-top:3px solid var(--gold)}
        .portfolio-card-copy{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.7fr);gap:50px;padding:25px 0}
        .portfolio-card h3{font-family:var(--font-display);font-size:clamp(1.8rem,3vw,2.65rem);line-height:1;text-transform:uppercase;margin:0}
        .project-location{display:block;color:var(--gold);font-size:.62rem;text-transform:uppercase;letter-spacing:.14em;margin-bottom:9px;font-weight:600}
        .portfolio-card-copy p{margin:0;color:#81796f;font-size:.9rem}
        .portfolio-dark .portfolio-card-copy p{color:#b9b1a6}
        .comparison-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .comparison-grid figure{position:relative;margin:0;height:clamp(340px,41vw,540px);overflow:hidden;background:#191919}
        .comparison-grid img{width:100%;height:100%;object-fit:cover}
        .photo-label{position:absolute;top:16px;left:16px;z-index:2;background:#0b0b0b;color:#fff;padding:8px 12px;font-size:.59rem;font-weight:600;text-transform:uppercase;letter-spacing:.14em}
        .photo-label.after{background:var(--gold);color:#090909}
        .portfolio-cta{background:var(--gold);color:#090909;padding:72px 0}
        .portfolio-cta-grid{display:grid;grid-template-columns:1fr auto;gap:60px;align-items:end}
        .portfolio-cta h2{max-width:760px;margin-top:10px}
        .portfolio-cta p{max-width:620px;margin:18px 0 0;color:#32260e}
        .portfolio-cta-actions{display:flex;flex-direction:column;gap:14px;align-items:stretch;min-width:220px}
        .portfolio-cta-actions>a:last-child{text-align:center;font-size:.74rem;font-weight:600;letter-spacing:.08em}
        @media(max-width:800px){
          .portfolio-hero{min-height:620px}
          .portfolio-hero-image{background-position:58% center}
          .portfolio-hero-shade{background:linear-gradient(90deg,rgba(5,5,5,.9),rgba(5,5,5,.5)),linear-gradient(0deg,rgba(5,5,5,.94),transparent 65%)}
          .portfolio-hero-inner{padding:30px 0 48px}
          .portfolio-logo{position:static;width:150px}
          .portfolio-hero-copy{padding-top:88px}
          .portfolio-hero h1{font-size:clamp(3.5rem,15vw,5.7rem)}
          .portfolio-jump{top:70px}
          .portfolio-jump .container{gap:22px}
          .portfolio-section{padding:62px 0 74px}
          .portfolio-section-heading,.portfolio-card-copy,.portfolio-cta-grid{grid-template-columns:1fr;gap:22px}
          .section-number{font-size:4rem}
          .portfolio-projects{gap:52px;margin-top:40px}
          .comparison-grid{grid-template-columns:1fr;gap:10px}
          .comparison-grid figure{height:auto;min-height:0}
          .comparison-grid img{height:auto;object-fit:contain}
          .portfolio-card-copy{padding:20px 0}
          .portfolio-cta-actions{min-width:0}
        }
      `}</style>
    </>
  );
}
