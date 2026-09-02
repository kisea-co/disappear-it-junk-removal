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
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 78 });
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState('Drag it. Flick it. Make it disappear.');
  const [madeShot, setMadeShot] = useState(false);

  useEffect(() => {
    const saved = Number(window.localStorage.getItem('trashketball-best') || 0);
    setBest(saved);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const endRound = useCallback(() => {
    setPlaying(false);
    setDragging(false);
    setMessage('Time! You cleared the court.');
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    if (time === 0 && playing) endRound();
  }, [time, playing, endRound]);

  const startGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScore(0);
    setTime(ROUND_SECONDS);
    setPlaying(true);
    setItemIndex(Math.floor(Math.random() * ITEMS.length));
    setPosition({ x: 50, y: 78 });
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
    if (!playing) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = courtPoint(event);
    trail.current = [point];
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !playing) return;
    const point = courtPoint(event);
    trail.current = [...trail.current.slice(-4), point];
    setPosition({ x: point.x, y: point.y });
  };

  const resetJunk = () => {
    setTimeout(() => {
      setPosition({ x: 50, y: 78 });
      setItemIndex(Math.floor(Math.random() * ITEMS.length));
      setMadeShot(false);
    }, 240);
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !playing) return;
    setDragging(false);
    const current = courtPoint(event);
    const box = courtRef.current!.getBoundingClientRect();
    const targetX = 50;
    const targetY = 27;
    const inDumpster = current.x > 33 && current.x < 67 && current.y > 15 && current.y < 42;
    const history = trail.current;
    const first = history[0] || current;
    const last = history[history.length - 1] || current;
    const elapsed = Math.max(1, last.time - first.time);
    const upwardSpeed = ((first.y - last.y) / elapsed) * 1000;
    const projectedX = current.x + ((last.x - first.x) / elapsed) * 90;
    const flickHit = upwardSpeed > 35 && Math.abs(projectedX - targetX) < 25 && current.y < 72;

    if (inDumpster || flickHit) {
      const earned = ITEMS[itemIndex].points;
      const nextScore = score + earned;
      setPosition({ x: targetX, y: targetY });
      setMadeShot(true);
      setScore(nextScore);
      setMessage(`+${earned} — disappeared!`);
      if (nextScore > best) {
        setBest(nextScore);
        window.localStorage.setItem('trashketball-best', String(nextScore));
      }
    } else {
      setMessage('So close—grab it and shoot again!');
      setPosition({ x: Math.max(10, Math.min(90, current.x)), y: Math.max(55, current.y) });
    }
    resetJunk();
  };

  const item = ITEMS[itemIndex];

  return (
    <section className={styles.gameSection}>
      <div className={styles.gameShell}>
        <div className={styles.scorebar}>
          <div><span>Score</span><strong>{score}</strong></div>
          <div className={styles.timer}><span>Time</span><strong>{time}</strong></div>
          <div><span>Best</span><strong>{best}</strong></div>
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
              className={`${styles.junk} ${dragging ? styles.dragging : ''} ${madeShot ? styles.made : ''}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              aria-label={`${item.name}, worth ${item.points} points. Drag or flick it into the dumpster.`}
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
          <span>{item.name}: {item.points} pts</span>
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
