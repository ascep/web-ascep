import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

const BLOB_KEY = "visitor-counter.json";

async function getCount(): Promise<number> {
  try {
    const blob = await head(BLOB_KEY);
    if (!blob) return 0;
    const res = await fetch(blob.url);
    const data = await res.json();
    return data.count || 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const count = await getCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const current = await getCount();
  const newCount = current + 1;

  try {
    await put(BLOB_KEY, JSON.stringify({ count: newCount }), {
      contentType: "application/json",
      access: "public",
      addRandomSuffix: false,
    });
  } catch (e) {
    console.error("Failed to write visitor counter:", e);
  }

  return NextResponse.json({ count: newCount });
}
