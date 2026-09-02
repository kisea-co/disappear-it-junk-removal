'use client';

import Link from 'next/link';
import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './trashketball.module.css';

const ROUND_SECONDS = 30;
const ITEMS = [
  { emoji: '🗑️', name: 'Trash bag', points: 10 },
  { emoji: '📦', name: 'Moving box', points: 15 },
  { emoji: '🪑', name: 'Old chair', points: 25 },
  { emoji: '🛞', name: 'Tire', points: 30 },
  { emoji: '🛋️', name: 'Couch', points: 50 },
];

type Point = { x: number; y: number; time: number };

export default function TrashketballGame() {
  const courtRef = useRef<HTMLDivElement>(null);
  const junkRef = useRef<HTMLButtonElement>(null);
  const trail = useRef<Point[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 50, y: 78 });
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 78 });
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState('Drag it. Flick it. Make it disappear.');
  const [madeShot, setMadeShot] = useState(false);
  const [shotInFlight, setShotInFlight] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [streak, setStreak] = useState(0);

  const moveJunk = (next: {x:number; y:number}) => {
    positionRef.current = next;
    setPosition(next);
  };

  useEffect(() => {
    const saved = Number(window.localStorage.getItem('trashketball-best') || 0);
    setBest(saved);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const endRound = useCallback(() => {
    setPlaying(false);
    setDragging(false);
    setShotInFlight(false);
    setMessage('Time! You cleared the court.');
    if (timerRef.current) clearInterval(timerRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    if (time === 0 && playing) endRound();
  }, [time, playing, endRound]);

  const startGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScore(0);
    setStreak(0);
    setTime(ROUND_SECONDS);
    setPlaying(true);
    setItemIndex(Math.floor(Math.random() * ITEMS.length));
    moveJunk({ x: 50, y: 78 });
    setMessage('Flick the junk into the dumpster!');
    timerRef.current = setInterval(() => setTime((value) => Math.max(0, value - 1)), 1000);
  };

  const courtPoint = (event: PointerEvent) => {
    const box = courtRef.current!.getBoundingClientRect();
    return {
      x: Math.max(6, Math.min(94, ((event.clientX - box.left) / box.width) * 100)),
      y: Math.max(10, Math.min(88, ((event.clientY - box.top) / box.height) * 100)),
      time: performance.now(),
    };
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!playing || shotInFlight) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = courtPoint(event);
    trail.current = [point];
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !playing) return;
    const point = courtPoint(event);
    trail.current = [...trail.current.slice(-4), point];
    moveJunk({ x: point.x, y: point.y });
  };

  const resetJunk = (delay = 260) => {
    setTimeout(() => {
      moveJunk({ x: 28 + Math.random() * 44, y: 78 });
      setItemIndex(Math.floor(Math.random() * ITEMS.length));
      setMadeShot(false);
      setShotInFlight(false);
      setRotation(0);
    }, delay);
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !playing) return;
    setDragging(false);
    const current = courtPoint(event);
    const history = trail.current;
    const first = history[0] || current;
    const last = history[history.length - 1] || current;
    const elapsed = Math.max(1, last.time - first.time);
    let velocityX = Math.max(-.16, Math.min(.16, ((last.x - first.x) / elapsed) * .82));
    let velocityY = Math.max(-.29, Math.min(-.055, ((last.y - first.y) / elapsed) * .9));

    if (((first.y - last.y) / elapsed) * 1000 < 24) {
      setMessage('Swipe up to shoot!');
      moveJunk({x: current.x, y: Math.max(58,current.y)});
      resetJunk(420);
      return;
    }

    setShotInFlight(true);
    setMessage('It\'s up!');
    moveJunk({x: current.x, y: current.y});
    let previous = performance.now();
    const launched = previous;
    let rimBounce = false;

    const fly = (now: number) => {
      const delta = Math.min(28, now - previous);
      previous = now;
      velocityY += .00042 * delta;
      let nextX = positionRef.current.x + velocityX * delta;
      let nextY = positionRef.current.y + velocityY * delta;

      if (nextX < 5 || nextX > 95) {
        velocityX *= -.68;
        nextX = Math.max(5, Math.min(95, nextX));
      }

      if (velocityY < 0 && nextY < 20 && nextX > 38 && nextX < 62) {
        velocityY = Math.abs(velocityY) * .62;
        velocityX += nextX < 50 ? -.025 : .025;
        setMessage('Off the backboard!');
      }

      const descendingIntoBin = velocityY > 0 && nextY >= 24 && nextY <= 35 && nextX > 38 && nextX < 62;
      if (descendingIntoBin) {
        const earned = ITEMS[itemIndex].points;
        setMadeShot(true);
        setStreak((oldStreak) => {
          const nextStreak = oldStreak + 1;
          setMessage(nextStreak >= 3 ? `ON FIRE! ${nextStreak} IN A ROW · +${earned}` : `SWISH! +${earned}`);
          return nextStreak;
        });
        setScore((oldScore) => {
          const nextScore = oldScore + earned;
          setBest((oldBest) => {
            const nextBest = Math.max(oldBest,nextScore);
            window.localStorage.setItem('trashketball-best',String(nextBest));
            return nextBest;
          });
          return nextScore;
        });
        moveJunk({x: 50,y: 31});
        resetJunk(190);
        return;
      }

      const hitRim = velocityY > 0 && nextY > 22 && nextY < 37 && ((nextX > 32 && nextX <= 38) || (nextX >= 62 && nextX < 68));
      if (hitRim && !rimBounce) {
        rimBounce = true;
        velocityY *= -.54;
        velocityX *= -.72;
        setMessage('CLANG! Off the edge.');
      }

      moveJunk({x: nextX,y: nextY});
      setRotation((value) => value + delta * .42);

      if (nextY > 96 || now - launched > 2400) {
        setStreak(0);
        setMessage('Missed it—shoot again!');
        resetJunk(240);
        return;
      }
      frameRef.current = requestAnimationFrame(fly);
    };
    frameRef.current = requestAnimationFrame(fly);
  };

  const item = ITEMS[itemIndex];

  return (
    <section className={styles.gameSection}>
      <div className={styles.gameShell}>
        <div className={`${styles.arenaBoard} ${playing ? styles.boardLive : ''}`}>
          <div className={styles.boardLights} aria-hidden="true">{Array.from({length:22},(_,i)=><i key={i}/>)}</div>
          <div className={styles.boardTitle}>TRASHKETBALL</div>
          <div className={styles.scorebar}>
            <div><span>Score</span><strong>{String(score).padStart(3,'0')}</strong></div>
            <div className={`${styles.timer} ${time <= 10 && playing ? styles.clockWarning : ''}`}><span>Time</span><strong>{String(time).padStart(2,'0')}</strong></div>
            <div><span>Best</span><strong>{String(best).padStart(3,'0')}</strong></div>
          </div>
        </div>

        <div ref={courtRef} className={styles.court} aria-label="Trashketball game court">
          <div className={styles.skyline} aria-hidden="true" />
          <div className={styles.backboard} aria-hidden="true"><span>DISAPPEAR IT</span></div>
          <div className={styles.dumpster} aria-label="Dumpster target">
            <div className={styles.dumpsterLid} />
            <div className={styles.dumpsterBody}><span>YOU&apos;LL NEVER<br/>SEE IT AGAIN</span></div>
          </div>
          <div className={styles.targetGlow} aria-hidden="true" />
          <div className={styles.courtLine} aria-hidden="true" />

          {playing && (
            <button
              ref={junkRef}
              type="button"
              className={`${styles.junk} ${dragging ? styles.dragging : ''} ${shotInFlight ? styles.flying : ''} ${madeShot ? styles.made : ''}`}
              style={{ left: `${position.x}%`, top: `${position.y}%`, rotate: `${rotation}deg` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              aria-label={`${item.name}, worth ${item.points} points. Swipe it toward the dumpster.`}
            >
              <span aria-hidden="true">{item.emoji}</span>
              <small>+{item.points}</small>
            </button>
          )}

          {!playing && (
            <div className={styles.overlay}>
              <span className={styles.spark}>✦</span>
              <h2>{time === 0 ? 'NICE SHOT.' : 'READY TO SHOOT?'}</h2>
              {time === 0 && <p className={styles.finalScore}>You scored <strong>{score}</strong> points.</p>}
              <button className="btn" type="button" onClick={startGame}>{time === 0 ? 'Play Again' : 'Start Game'} →</button>
            </div>
          )}
        </div>

        <div className={styles.gameFooter}>
          <p role="status" aria-live="polite">{message}</p>
          <span>{streak > 1 ? `${streak} shot streak · ` : ''}{item.name}: {item.points} pts</span>
        </div>

        {!playing && time === 0 && (
          <div className={styles.realJunk}>
            <div><span>THE GAME WAS EASY.</span><h2>LET US HANDLE<br/>THE HEAVY STUFF.</h2></div>
            <Link className="btn" href="/contact">Get a Free Quote →</Link>
          </div>
        )}
      </div>
    </section>
  );
}
