import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const secret = process.env.STUDIO_SECRET;

  if (!secret || password !== secret) {
    return NextResponse.json({ error: "Password incorrecto" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("studio_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/studio",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
