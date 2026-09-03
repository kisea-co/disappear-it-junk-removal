import { Redis } from "@upstash/redis";
import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (value: unknown, max = 500) =>
  String(value ?? "")
    .trim()
    .slice(0, max);
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ] || character,
  );
const rewardKey = (value: string) =>
  `trashketball:claimed:${createHash("sha256").update(value).digest("hex")}`;

function getRedis() {
  const url =
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Reward verification is not configured.");
  return new Redis({ url, token });
}

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 25000)
      return NextResponse.json(
        { error: "Request is too large." },
        { status: 413 },
      );
    const body = await request.json();
    if (clean(body.company)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 100);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160).toLowerCase();
    const location = clean(body.location, 160);
    const junk = clean(body.junk, 2500);
    const date = clean(body.date, 40) || "Not specified";
    const rewardAmount: 0 | 25 | 50 =
      body.reward === "50" ? 50 : body.reward === "25" ? 25 : 0;
    const reward = rewardAmount
      ? `$${rewardAmount} off any load size — one-time offer`
      : "None";

    if (!name || !phone || !email || !location || !junk)
      return NextResponse.json(
        { error: "Please complete every required field." },
        { status: 400 },
      );
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    if (!process.env.RESEND_API_KEY)
      return NextResponse.json(
        {
          error:
            "The quote service is being connected. Please call us for now.",
        },
        { status: 503 },
      );

    let redis: Redis | null = null;
    let claimKeys: string[] = [];
    if (rewardAmount) {
      try {
        redis = getRedis();
        const phoneDigits = phone.replace(/\D/g, "");
        claimKeys = [
          rewardKey(`email:${email}`),
          rewardKey(`phone:${phoneDigits}`),
        ];
        const existing = await Promise.all(
          claimKeys.map((key) => redis!.get(key)),
        );
        if (existing.some(Boolean))
          return NextResponse.json(
            {
              error:
                "This one-time Trashketball reward has already been claimed. Please submit a regular quote request instead.",
              code: "REWARD_ALREADY_CLAIMED",
            },
            { status: 409 },
          );
        const reserved = await redis.set(claimKeys[0], "pending", {
          nx: true,
          ex: 600,
        });
        if (!reserved)
          return NextResponse.json(
            {
              error:
                "This one-time Trashketball reward is already being claimed.",
              code: "REWARD_ALREADY_CLAIMED",
            },
            { status: 409 },
          );
        const phoneReserved = await redis.set(claimKeys[1], "pending", {
          nx: true,
          ex: 600,
        });
        if (!phoneReserved) {
          await redis.del(claimKeys[0]);
          return NextResponse.json(
            {
              error:
                "This one-time Trashketball reward is already being claimed.",
              code: "REWARD_ALREADY_CLAIMED",
            },
            { status: 409 },
          );
        }
      } catch (error) {
        console.error("Trashketball reward verification error", error);
        return NextResponse.json(
          {
            error:
              "We could not verify the Trashketball reward. Please try again shortly.",
          },
          { status: 503 },
        );
      }
    }

    const rows = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Location / ZIP", location],
      ["Preferred pickup date", date],
      ["Trashketball reward", reward],
      ["What needs to be removed?", junk],
    ];
    const html = `<div style="font-family:Arial,sans-serif;color:#111;max-width:640px"><div style="background:#0b0b0b;color:#fff;padding:24px"><div style="color:#d1ae47;font-size:12px;letter-spacing:2px">DISAPPEAR IT JUNK &amp; TRASH REMOVAL LLC</div><h1 style="margin:8px 0 0;font-size:28px">New Quote Request</h1></div><div style="border:1px solid #ddd;border-top:0;padding:24px">${rows.map(([label, value]) => `<div style="padding:12px 0;border-bottom:1px solid #eee"><strong style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#70571d">${label}</strong><div style="margin-top:4px;white-space:pre-wrap">${escapeHtml(value)}</div></div>`).join("")}</div></div>`;
    const text = rows
      .map(([label, value]) => `${label}:\n${value}`)
      .join("\n\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Disappear It Quotes <quotes@disappearitjunkremoval.com>",
        to: ["junkdisappears@gmail.com"],
        reply_to: email,
        subject: `New quote request from ${name} — ${location}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      if (redis && claimKeys.length)
        await Promise.all(claimKeys.map((key) => redis!.del(key)));
      console.error(
        "Resend quote error",
        response.status,
        await response.text(),
      );
      return NextResponse.json(
        {
          error: "We could not send your request. Please try again or call us.",
        },
        { status: 502 },
      );
    }
    if (redis && claimKeys.length)
      await Promise.all(claimKeys.map((key) => redis!.set(key, "claimed")));
    return NextResponse.json({
      ok: true,
      rewardClaimed: Boolean(rewardAmount),
    });
  } catch (error) {
    console.error("Quote submission error", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
