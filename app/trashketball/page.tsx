import type { Metadata } from 'next';
import TrashketballGame from './TrashketballGame';
import styles from './trashketball.module.css';

export const metadata: Metadata = {
  title: 'Trashketball | Disappear It Junk & Trash Removal LLC',
  description: 'Play Trashketball, then let Disappear It handle the real heavy stuff throughout Metro Atlanta.',
};

export default function TrashketballPage() {
  return <>
    <section className={styles.hero}>
      <div className="container">
        <div className="eyebrow">The Disappear It Challenge</div>
        <h1>TRASH<span>KETBALL.</span></h1>
        <p>Think you&apos;ve got aim? Swipe up to send as much junk as you can through the hoop before the clock hits zero.</p>
        <div className={styles.rules}><span>Play: $25 off any load size</span><span>Score 500+: $50 off any load size</span><span>30 seconds</span></div>
        <p style={{maxWidth:'720px',marginTop:'16px',fontSize:'.72rem',lineHeight:1.55,letterSpacing:'.04em',color:'#b9b1a6'}}>One-time offer. Redeem either $25 off or $50 off. Discounts cannot be stacked, combined, transferred or used with any other offer. Limit one Trashketball discount per customer.</p>
      </div>
    </section>
    <TrashketballGame />
  </>;
}
