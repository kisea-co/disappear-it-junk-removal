import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

type ScoreEntry = {
  id: string;
  name: string;
  score: number;
  createdAt: string;
};

const LEADERS_KEY = 'trashketball:leaders';
const RECENT_KEY = 'trashketball:recent';
const SESSION_PREFIX = 'trashketball:session:';

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Leaderboard database is not configured.');
  return new Redis({ url, token });
}

async function leaderboard(redis: Redis) {
  const [leaders, recent] = await Promise.all([
    redis.zrange<ScoreEntry[]>(LEADERS_KEY, 0, 0, { rev: true }),
    redis.lrange<ScoreEntry[]>(RECENT_KEY, 0, 7),
  ]);
  return { highScore: leaders[0] || null, recent };
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

    const entry: ScoreEntry = { id: crypto.randomUUID(), name, score, createdAt: new Date().toISOString() };
    await Promise.all([
      redis.zadd(LEADERS_KEY, { score, member: entry }),
      redis.lpush(RECENT_KEY, entry),
    ]);
    await redis.ltrim(RECENT_KEY, 0, 7);

    return NextResponse.json({ saved: true, ...(await leaderboard(redis)) });
  } catch {
    return NextResponse.json({ error: 'The leaderboard is temporarily unavailable.' }, { status: 503 });
  }
}
