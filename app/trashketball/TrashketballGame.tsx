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
  { emoji: '🤖', name: 'Old robot', points: 20 },
  { emoji: '🏀', name: 'Basketball', points: 10 },
  { emoji: '🏈', name: 'Football', points: 15 },
  { emoji: '🚲', name: 'Bicycle', points: 40 },
  { emoji: '🎸', name: 'Guitar', points: 30 },
  { emoji: '🚽', name: 'Old toilet', points: 50 },
  { emoji: '🛹', name: 'Skateboard', points: 25 },
  { emoji: '🖨️', name: 'Printer', points: 30 },
  { emoji: '🖥️', name: 'Desktop computer', points: 40 },
  { emoji: '📺', name: 'Television', points: 40 },
  { emoji: '💻', name: 'Laptop', points: 25 },
];

type Point = { x: number; y: number; time: number };
type ScoreEntry = { id: string; name: string; score: number; createdAt: string };
type SoundName = 'start'|'pickup'|'launch'|'board'|'rim'|'swish'|'fire'|'miss'|'countdown'|'buzzer'|'crush';

const SOUND_FILES: Record<Exclude<SoundName,'fire'>,string> = {
  start:'/sounds/start-whistle.mp3',
  pickup:'/sounds/pickup-dribble.mp3',
  launch:'/sounds/shot-launch.mp3',
  board:'/sounds/backboard-hit.mp3',
  rim:'/sounds/rim-clang.mp3',
  swish:'/sounds/cha-ching.mp3',
  miss:'/sounds/miss-thud.mp3',
  countdown:'/sounds/countdown-beep.mp3',
  buzzer:'/sounds/final-buzzer.mp3',
  crush:'/sounds/compactor-crush.mp3',
};

export default function TrashketballGame() {
  const courtRef = useRef<HTMLDivElement>(null);
  const junkRef = useRef<HTMLButtonElement>(null);
  const trail = useRef<Point[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef<number | null>(null);
  const goalFrameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 50, y: 78 });
  const goalXRef = useRef(50);
  const audioRef = useRef<AudioContext | null>(null);
  const soundOnRef = useRef(true);
  const mediaRef = useRef<Partial<Record<Exclude<SoundName,'fire'>,HTMLAudioElement>>>({});
  const madeShotsRef = useRef(0);
  const sessionIdRef = useRef('');
  const playerNameRef = useRef('');
  const scoreRef = useRef(0);
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
  const [soundOn, setSoundOn] = useState(true);
  const [goalX, setGoalX] = useState(50);
  const [reward, setReward] = useState<0|25|50>(0);
  const [playerName, setPlayerName] = useState('');
  const [recentScores, setRecentScores] = useState<ScoreEntry[]>([]);
  const [highScore, setHighScore] = useState<ScoreEntry|null>(null);
  const [scoreStatus, setScoreStatus] = useState('');

  const audioContext = () => {
    if (!audioRef.current) audioRef.current = new AudioContext();
    if (audioRef.current.state === 'suspended') void audioRef.current.resume();
    return audioRef.current;
  };

  const unlockMobileAudio = () => {
    const context = audioContext();
    const silentBuffer = context.createBuffer(1,1,context.sampleRate);
    const source = context.createBufferSource();
    source.buffer = silentBuffer;
    source.connect(context.destination);
    source.start(0);
    return context.state === 'suspended' ? context.resume() : Promise.resolve();
  };

  const tone = (frequency:number, duration:number, type:OscillatorType = 'sine', volume = .07, delay = 0) => {
    if (!soundOnRef.current) return;
    const context = audioContext();
    const start = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency,start);
    gain.gain.setValueAtTime(volume,start);
    gain.gain.exponentialRampToValueAtTime(.001,start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  };

  const noise = (duration:number, volume = .025, filterFrequency = 1800, delay = 0) => {
    if (!soundOnRef.current) return;
    const context = audioContext();
    const buffer = context.createBuffer(1,Math.ceil(context.sampleRate * duration),context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const start = context.currentTime + delay;
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.value = filterFrequency;
    filter.Q.value = .8;
    gain.gain.setValueAtTime(volume,start);
    gain.gain.exponentialRampToValueAtTime(.001,start + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(start);
  };

  const chaChing = () => {
    if (!soundOnRef.current) return;
    tone(1320,.08,'square',.035);
    tone(1760,.1,'sine',.055,.07);
    tone(2090,.22,'sine',.05,.14);
    tone(2637,.3,'triangle',.032,.19);
  };

  const announceFire = () => {
    if (!soundOnRef.current || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const callout = new SpeechSynthesisUtterance("You're on fire!");
    callout.rate = 1.05;
    callout.pitch = .82;
    callout.volume = .9;
    window.speechSynthesis.speak(callout);
  };

  const syntheticSound = (name:SoundName) => {
    if (name === 'start') { tone(1180,.28,'sine',.045); tone(1480,.34,'sine',.035,.06); }
    if (name === 'pickup') { tone(128,.07,'sine',.055); tone(82,.11,'sine',.045,.05); }
    if (name === 'launch') { noise(.09,.022,2800); tone(210,.09,'sine',.035); tone(340,.11,'sine',.03,.04); }
    if (name === 'board') { tone(155,.12,'square',.055); tone(105,.16,'triangle',.05,.04); }
    if (name === 'rim') { tone(230,.08,'square',.05); tone(165,.13,'square',.04,.07); }
    if (name === 'swish') { noise(.22,.035,2400); chaChing(); }
    if (name === 'fire') { noise(.45,.045,1100); chaChing(); tone(880,.12,'triangle',.04,.25); tone(1100,.22,'triangle',.04,.34); announceFire(); }
    if (name === 'miss') tone(92,.2,'triangle',.045);
    if (name === 'countdown') tone(880,.09,'square',.045);
    if (name === 'buzzer') { tone(165,.72,'sawtooth',.065); tone(138,.72,'square',.035,.04); noise(.8,.025,450); }
    if (name === 'crush') { tone(105,.22,'sawtooth',.06,.08); tone(72,.28,'square',.045,.16); }
  };

  const playFile = (name:Exclude<SoundName,'fire'>) => {
    if (!soundOnRef.current) return;
    let audio = mediaRef.current[name];
    if (!audio) {
      audio = new Audio(SOUND_FILES[name]);
      audio.preload = 'auto';
      mediaRef.current[name] = audio;
    }
    audio.currentTime = 0;
    audio.volume = name === 'buzzer' ? .9 : .72;
    void audio.play().catch(() => syntheticSound(name));
  };

  const sound = (name:SoundName) => {
    if (!soundOnRef.current) return;
    if (name === 'fire') {
      playFile('swish');
      announceFire();
      return;
    }
    playFile(name);
  };

  const moveJunk = (next: {x:number; y:number}) => {
    positionRef.current = next;
    setPosition(next);
  };

  useEffect(() => {
    const saved = Number(window.localStorage.getItem('trashketball-best') || 0);
    setBest(saved);
    const savedReward = Number(window.localStorage.getItem('trashketball-reward'));
    if (savedReward === 25 || savedReward === 50) setReward(savedReward);
    (Object.entries(SOUND_FILES) as [Exclude<SoundName,'fire'>,string][]).forEach(([name,src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.load();
      mediaRef.current[name] = audio;
    });
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (goalFrameRef.current) cancelAnimationFrame(goalFrameRef.current);
    };
  }, []);

  useEffect(() => {
    void fetch('/api/scores', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        setHighScore(data.highScore || null);
        setRecentScores(Array.isArray(data.recent) ? data.recent : []);
      })
      .catch(() => undefined);
  }, []);

  const submitScore = useCallback(async () => {
    const finalScore = scoreRef.current;
    if (finalScore < 250) {
      setScoreStatus(`Score ${250 - finalScore} more points to join the leaderboard.`);
      return;
    }
    if (!sessionIdRef.current) {
      setScoreStatus('Leaderboard connection unavailable—your discount is still unlocked.');
      return;
    }
    setScoreStatus('Posting your score…');
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdRef.current, name: playerNameRef.current, score: finalScore, shots: madeShotsRef.current }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Your score could not be saved.');
      setHighScore(data.highScore || null);
      setRecentScores(Array.isArray(data.recent) ? data.recent : []);
      setScoreStatus(data.personalBest ? 'Leaderboard unlocked—new personal best!' : 'Leaderboard unlocked—score posted!');
    } catch (error) {
      setScoreStatus(error instanceof Error ? error.message : 'Your score could not be saved.');
    }
  }, []);

  const endRound = useCallback(() => {
    setPlaying(false);
    setDragging(false);
    setShotInFlight(false);
    setMessage('Time! You cleared the court.');
    sound('buzzer');
    if (timerRef.current) clearInterval(timerRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (goalFrameRef.current) cancelAnimationFrame(goalFrameRef.current);
    timerRef.current = null;
    void submitScore();
  }, [submitScore]);

  useEffect(() => {
    if (time === 0 && playing) endRound();
  }, [time, playing, endRound]);

  useEffect(() => {
    if (playing && time > 0 && time <= 5) sound('countdown');
  }, [time,playing]);

  useEffect(() => {
    if (!playing) {
      goalXRef.current = 50;
      setGoalX(50);
      return;
    }
    const moveGoal = (now:number) => {
      const next = 50 + Math.sin(now / 1250) * 17;
      goalXRef.current = next;
      setGoalX(next);
      goalFrameRef.current = requestAnimationFrame(moveGoal);
    };
    goalFrameRef.current = requestAnimationFrame(moveGoal);
    return () => { if (goalFrameRef.current) cancelAnimationFrame(goalFrameRef.current); };
  }, [playing]);

  const startGame = () => {
    const cleanName = playerName.trim().replace(/\s+/g, ' ');
    if (cleanName.length < 2) return;
    playerNameRef.current = cleanName;
    void unlockMobileAudio();
    sound('start');
    if (timerRef.current) clearInterval(timerRef.current);
    setScore(0);
    scoreRef.current = 0;
    madeShotsRef.current = 0;
    setScoreStatus('');
    sessionIdRef.current = '';
    void fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'start' }),
    }).then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => { sessionIdRef.current = data.sessionId || ''; })
      .catch(() => setScoreStatus('Leaderboard connection unavailable—your game still counts for the discount.'));
    setReward((current) => {
      const next = current || 25;
      window.localStorage.setItem('trashketball-reward',String(next));
      return next;
    });
    setStreak(0);
    setTime(ROUND_SECONDS);
    setPlaying(true);
    setItemIndex(Math.floor(Math.random() * ITEMS.length));
    moveJunk({ x: 50, y: 78 });
    setMessage('Swipe the junk through the hoop!');
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
    sound('pickup');
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
    sound('launch');
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

      const targetX = goalXRef.current;

      if (velocityY < 0 && nextY < 20 && nextX > targetX - 12 && nextX < targetX + 12) {
        velocityY = Math.abs(velocityY) * .62;
        velocityX += nextX < targetX ? -.025 : .025;
        setMessage('Off the backboard!');
        sound('board');
      }

      const throughHoop = velocityY > 0 && nextY >= 21 && nextY <= 29 && nextX > targetX - 7 && nextX < targetX + 7;
      if (throughHoop) {
        const earned = ITEMS[itemIndex].points;
        madeShotsRef.current += 1;
        setMadeShot(true);
        setStreak((oldStreak) => {
          const nextStreak = oldStreak + 1;
          setMessage(nextStreak >= 3 ? `ON FIRE! ${nextStreak} IN A ROW · +${earned}` : `SWISH! +${earned}`);
          sound(nextStreak >= 3 ? 'fire' : 'swish');
          sound('crush');
          if (navigator.vibrate) navigator.vibrate(nextStreak >= 3 ? [35,25,55] : 35);
          return nextStreak;
        });
        setScore((oldScore) => {
          const nextScore = oldScore + earned;
          scoreRef.current = nextScore;
          if (nextScore >= 500) {
            setReward(50);
            window.localStorage.setItem('trashketball-reward','50');
          }
          setBest((oldBest) => {
            const nextBest = Math.max(oldBest,nextScore);
            window.localStorage.setItem('trashketball-best',String(nextBest));
            return nextBest;
          });
          return nextScore;
        });
        moveJunk({x: targetX,y: 33});
        resetJunk(430);
        return;
      }

      const hitRim = velocityY > 0 && nextY > 20 && nextY < 30 && ((nextX > targetX - 12 && nextX <= targetX - 7) || (nextX >= targetX + 7 && nextX < targetX + 12));
      if (hitRim && !rimBounce) {
        rimBounce = true;
        velocityY *= -.54;
        velocityX *= -.72;
        setMessage('CLANG! Off the edge.');
        sound('rim');
      }

      moveJunk({x: nextX,y: nextY});
      setRotation((value) => value + delta * .42);

      if (nextY > 96 || now - launched > 2400) {
        setStreak(0);
        setMessage('Missed it—shoot again!');
        sound('miss');
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
          <div className={styles.backboard} style={{left:`${goalX}%`}} aria-hidden="true"><span>DISAPPEAR IT</span></div>
          <div className={`${styles.hoop} ${streak >= 6 ? styles.goalOnFire : ''} ${madeShot ? styles.netHit : ''}`} style={{left:`${goalX}%`}} aria-label={`Moving Trashketball hoop${streak >= 6 ? ', on fire' : ''}`}>
            {streak >= 6 && <div className={styles.goalFire} aria-hidden="true">{Array.from({length:9},(_,i)=><span key={i}>🔥</span>)}</div>}
            <div className={styles.rim}/>
            <div className={styles.net}>
              <img className={styles.chainNet} src="/images/game/chain-net-realistic.png" alt="" aria-hidden="true" />
            </div>
          </div>
          <div className={`${styles.dumpster} ${madeShot ? styles.compacting : ''}`} style={{left:`${goalX}%`}} aria-label="Moving dumpster compactor beneath the hoop">
            <div className={styles.dumpsterLid} />
            <div className={styles.compactorPlate} aria-hidden="true"><i/><i/><i/><i/><i/></div>
            <div className={styles.dumpsterBody}><span>YOU&apos;LL NEVER<br/>SEE IT AGAIN</span><b aria-hidden="true">CRUSH!</b></div>
            <div className={styles.crushSparks} aria-hidden="true">{Array.from({length:8},(_,i)=><i key={i}/>)}</div>
          </div>
          <div className={styles.targetGlow} style={{left:`${goalX}%`}} aria-hidden="true" />
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
              aria-label={`${item.name}, worth ${item.points} points. Swipe it through the hoop.`}
            >
              <span aria-hidden="true">{item.emoji}</span>
              <small>+{item.points}</small>
            </button>
          )}

          {!playing && (
            <div className={styles.overlay}>
              <span className={styles.spark}>✦</span>
              <h2>{time === 0 ? 'NICE SHOT.' : 'READY TO SHOOT?'}</h2>
              {time === 0 ? <><p className={styles.finalScore}>You scored <strong>{score}</strong> points.</p><div className={styles.rewardUnlocked}><small>REWARD UNLOCKED</small><strong>${reward || 25} OFF</strong><span>ANY LOAD SIZE</span></div>{scoreStatus && <p className={styles.scoreStatus} role="status">{scoreStatus}</p>}</> : <><p className={styles.offerPrompt}>Play this round to unlock <strong>$25 off</strong>. Score 500+ to unlock <strong>$50 off</strong>.</p><div className={styles.playerEntry}><label htmlFor="trashketball-player">PLAYER NAME</label><input id="trashketball-player" value={playerName} onChange={(event) => { setPlayerName(event.target.value); playerNameRef.current = event.target.value; }} maxLength={20} placeholder="Nickname or first name" autoComplete="nickname"/></div></>}
              <button className="btn" type="button" onClick={startGame} disabled={time !== 0 && playerName.trim().length < 2}>{time === 0 ? 'Play Again' : 'Start Game'} →</button>
              {time === 0 && <Link className={styles.claimLink} href={`/contact?trashketball=${reward || 25}`}>Claim ${reward || 25} off your load →</Link>}
            </div>
          )}
        </div>

        <div className={styles.gameFooter}>
          <p role="status" aria-live="polite">{message}</p>
          <div className={styles.gameMeta}><span>{streak > 1 ? `${streak} shot streak · ` : ''}{item.name}: {item.points} pts</span><button type="button" onClick={() => { const next = !soundOnRef.current; soundOnRef.current = next; if (next) audioContext(); setSoundOn(next); }} aria-pressed={soundOn}>{soundOn ? 'Sound on 🔊' : 'Sound off 🔇'}</button></div>
        </div>

        <aside className={styles.leaderboard} aria-label="Trashketball leaderboard">
          <div className={styles.highScore}><small>ALL-TIME HIGH SCORE</small>{highScore ? <><strong>{highScore.score}</strong><span>{highScore.name}</span></> : <><strong>---</strong><span>Be the first to post a score</span></>}</div>
          <div className={styles.recentPlayers}><div><small>RECENT HIGH SCORES · 250+</small><span>SCORE</span></div>{recentScores.length ? recentScores.map((entry) => <div key={entry.id}><span>{entry.name}</span><strong>{entry.score}</strong></div>) : <p>No qualifying scores yet. The court is yours.</p>}</div>
        </aside>

        {!playing && time === 0 && (
          <div className={styles.realJunk}>
            <div><span>YOU UNLOCKED ${reward || 25} OFF ANY LOAD SIZE.</span><h2>LET US HANDLE<br/>THE HEAVY STUFF.</h2></div>
            <Link className="btn" href={`/contact?trashketball=${reward || 25}`}>Claim Your Discount →</Link>
          </div>
        )}
      </div>
    </section>
  );
}
