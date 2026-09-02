import Link from 'next/link';
import styles from './TrashketballPreview.module.css';

export default function TrashketballPreview() {
  return (
    <section className={styles.section} aria-labelledby="trashketball-preview-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div className="eyebrow">Play Trashketball. Save on your load.</div>
          <h2 id="trashketball-preview-title">SHOOT YOUR SHOT.<br/><span>UNLOCK YOUR DISCOUNT.</span></h2>
          <p>Take one 30-second shot at Trashketball and you&apos;ve already earned money off your junk removal.</p>
          <div className={styles.rewards}>
            <div><small>PLAY A ROUND</small><strong>$25 OFF</strong><span>Any load size</span></div>
            <div><small>SCORE 500+</small><strong>$50 OFF</strong><span>Any load size</span></div>
          </div>
          <Link className="btn" href="/trashketball">Play Trashketball →</Link>
        </div>
        <Link className={styles.preview} href="/trashketball" aria-label="Play Trashketball and unlock a junk removal discount">
          <div className={styles.scoreboard}><span>TRASHKETBALL</span><div><b><small>SCORE</small>025</b><b><small>TIME</small>24</b></div></div>
          <div className={styles.court}>
            <div className={styles.shot} aria-hidden="true">📦</div>
            <div className={styles.goal} aria-hidden="true"><i className={styles.board}/><i className={styles.rim}/><i className={styles.net}/><i className={styles.dumpster}/></div>
            <div className={styles.tap}>TAP TO PLAY <span>→</span></div>
          </div>
        </Link>
      </div>
    </section>
  );
}
