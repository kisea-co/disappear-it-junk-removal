import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

type ReplayFrame = {
  x: number;
  y: number;
  goalX: number;
  t: number;
};

type ReplayShot = {
  itemIndex: number;
  startedAt: number;
  made: boolean;
  points: number;
  frames: ReplayFrame[];
};

type ReplayData = {
  duration: number;
  shots: ReplayShot[];
};

type ScoreEntry = {
  id: string;
  name: string;
  score: number;
  createdAt: string;
  replay?: ReplayData;
};

const LEADERS_KEY = 'trashketball:leaders';
const RECENT_KEY = 'trashketball:recent';
const SESSION_PREFIX = 'trashketball:session:';
const PLAYER_PREFIX = 'trashketball:player:';
const LEADERBOARD_MINIMUM = 250;
const MAX_REPLAY_SHOTS = 50;
const MAX_FRAMES_PER_SHOT = 80;
const MAX_REPLAY_DURATION = 35000;

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Leaderboard database is not configured.');
  return new Redis({ url, token });
}

function finite(value: unknown, min: number, max: number) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

function sanitizeReplay(value: unknown): ReplayData | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const raw = value as { duration?: unknown; shots?: unknown };
  const duration = finite(raw.duration, 1000, MAX_REPLAY_DURATION);
  if (duration === null || !Array.isArray(raw.shots) || raw.shots.length > MAX_REPLAY_SHOTS) return undefined;

  const shots: ReplayShot[] = [];
  for (const rawShot of raw.shots) {
    if (!rawShot || typeof rawShot !== 'object') return undefined;
    const shot = rawShot as Record<string, unknown>;
    const itemIndex = finite(shot.itemIndex, 0, 15);
    const startedAt = finite(shot.startedAt, 0, duration);
    const points = finite(shot.points, 0, 50);
    if (itemIndex === null || startedAt === null || points === null || typeof shot.made !== 'boolean' || !Array.isArray(shot.frames) || shot.frames.length < 2 || shot.frames.length > MAX_FRAMES_PER_SHOT) return undefined;

    const frames: ReplayFrame[] = [];
    let previousT = -1;
    for (const rawFrame of shot.frames) {
      if (!rawFrame || typeof rawFrame !== 'object') return undefined;
      const frame = rawFrame as Record<string, unknown>;
      const x = finite(frame.x, 0, 100);
      const y = finite(frame.y, 0, 110);
      const goalX = finite(frame.goalX, 20, 80);
      const t = finite(frame.t, 0, 3000);
      if (x === null || y === null || goalX === null || t === null || t < previousT) return undefined;
      previousT = t;
      frames.push({ x, y, goalX, t });
    }
    shots.push({ itemIndex, startedAt, made: shot.made, points, frames });
  }

  return shots.length ? { duration, shots } : undefined;
}

async function leaderboard(redis: Redis) {
  const [leaderNames, recent] = await Promise.all([
    redis.zrange<string[]>(LEADERS_KEY, 0, 0, { rev: true }),
    redis.lrange<ScoreEntry[]>(RECENT_KEY, 0, 7),
  ]);
  const highScore = leaderNames[0] ? await redis.get<ScoreEntry>(`${PLAYER_PREFIX}${leaderNames[0]}`) : null;
  return { highScore: highScore || null, recent };
}

export async function GET() {
  try {
    return NextResponse.json(await leaderboard(getRedis()));
  } catch {
    return NextResponse.json({ highScore: null, recent: [] }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const redis = getRedis();

    if (body.action === 'start') {
      const sessionId = crypto.randomUUID();
      await redis.set(`${SESSION_PREFIX}${sessionId}`, { startedAt: Date.now() }, { ex: 120 });
      return NextResponse.json({ sessionId });
    }

    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
    const name = typeof body.name === 'string' ? body.name.trim().replace(/\s+/g, ' ').slice(0, 20) : '';
    const score = Number(body.score);
    const shots = Number(body.shots);
    const replay = sanitizeReplay(body.replay);
    if (!sessionId || !/^[a-zA-Z0-9 .'-]{2,20}$/.test(name)) {
      return NextResponse.json({ error: 'Enter a nickname using 2–20 letters or numbers.' }, { status: 400 });
    }
    if (!Number.isInteger(score) || score < 0 || score > 2000 || !Number.isInteger(shots) || shots < 0 || shots > 50 || score > shots * 50) {
      return NextResponse.json({ error: 'That score could not be verified.' }, { status: 400 });
    }

    const session = await redis.get<{ startedAt: number }>(`${SESSION_PREFIX}${sessionId}`);
    if (!session || Date.now() - session.startedAt < 25000 || Date.now() - session.startedAt > 120000) {
      return NextResponse.json({ error: 'This game session has expired or could not be verified.' }, { status: 400 });
    }
    await redis.del(`${SESSION_PREFIX}${sessionId}`);

    if (score < LEADERBOARD_MINIMUM) {
      return NextResponse.json({ saved: false, qualified: false, ...(await leaderboard(redis)) });
    }

    const entry: ScoreEntry = {
      id: crypto.randomUUID(),
      name,
      score,
      createdAt: new Date().toISOString(),
      ...(replay ? { replay } : {}),
    };
    const playerKey = name.toLowerCase();
    const previousBest = await redis.get<ScoreEntry>(`${PLAYER_PREFIX}${playerKey}`);
    if (!previousBest || score > previousBest.score) {
      await Promise.all([
        redis.set(`${PLAYER_PREFIX}${playerKey}`, entry),
        redis.zadd(LEADERS_KEY, { score, member: playerKey }),
      ]);
    }
    await redis.lpush(RECENT_KEY, entry);
    await redis.ltrim(RECENT_KEY, 0, 7);

    return NextResponse.json({ saved: true, qualified: true, personalBest: !previousBest || score > previousBest.score, ...(await leaderboard(redis)) });
  } catch {
    return NextResponse.json({ error: 'The leaderboard is temporarily unavailable.' }, { status: 503 });
  }
}
