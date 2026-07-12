import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

const BLOB_KEY = "comments.json";

function sanitize(text: string): string {
  return text
    .replace(/[<>&"']/g, (char) => ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#x27;",
    }[char] || char))
    .trim()
    .slice(0, 500);
}

interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

async function getComments(): Promise<Comment[]> {
  try {
    const blob = await head(BLOB_KEY);
    if (!blob) return [];
    const res = await fetch(blob.url);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function saveComments(comments: Comment[]) {
  await put(BLOB_KEY, JSON.stringify(comments), {
    contentType: "application/json",
    access: "public",
    addRandomSuffix: false,
  });
}

export async function GET() {
  const comments = await getComments();
  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = sanitize(body.name || "An\u00f3nimo");
    const text = sanitize(body.text || "");

    if (!text) {
      return NextResponse.json({ error: "El comentario no puede estar vac\u00edo" }, { status: 400 });
    }

    const comments = await getComments();
    const newComment: Comment = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name || "An\u00f3nimo",
      text,
      createdAt: new Date().toISOString(),
    };

    comments.unshift(newComment);
    if (comments.length > 200) comments.length = 200;

    await saveComments(comments);

    return NextResponse.json({ comment: newComment });
  } catch {
    return NextResponse.json({ error: "Error al procesar el comentario" }, { status: 500 });
  }
}
