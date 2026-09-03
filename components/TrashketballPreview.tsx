import Link from 'next/link';
import styles from './TrashketballPreview.module.css';
import gameStyles from '../app/trashketball/trashketball.module.css';

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
          <p style={{maxWidth:'620px',margin:'16px 0 20px',fontSize:'.72rem',lineHeight:1.55,letterSpacing:'.03em',color:'#aaa196'}}>One-time offer. Redeem either $25 off or $50 off. Discounts cannot be stacked, combined, transferred or used with any other offer. Limit one Trashketball discount per customer.</p>
          <Link className="btn" href="/trashketball">Play Trashketball →</Link>
        </div>
        <Link className={styles.preview} href="/trashketball" aria-label="Play Trashketball and unlock a junk removal discount">
          <div className={styles.scoreboard}><span>TRASHKETBALL</span><div><b><small>SCORE</small>025</b><b><small>TIME</small>24</b></div></div>
          <div className={styles.court}>
            <div className={styles.shot} aria-hidden="true">📦</div>
            <div className={`${gameStyles.backboard} ${styles.previewBackboard}`} aria-hidden="true"><span>DISAPPEAR IT</span></div>
            <div className={`${gameStyles.hoop} ${styles.previewHoop}`} aria-hidden="true">
              <div className={gameStyles.rim}/>
              <div className={gameStyles.net}><img className={gameStyles.chainNet} src="/images/game/chain-net-realistic.png" alt="" /></div>
            </div>
            <div className={`${gameStyles.dumpster} ${styles.previewDumpster}`} aria-hidden="true">
              <div className={gameStyles.dumpsterLid}/>
              <div className={gameStyles.dumpsterBody}><span>YOU&apos;LL NEVER<br/>SEE IT AGAIN</span></div>
            </div>
            <div className={styles.tap}>TAP TO PLAY <span>→</span></div>
          </div>
        </Link>
      </div>
    </section>
  );
}
