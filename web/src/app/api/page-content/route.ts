import { NextResponse } from "next/server";
import { getPageContent } from "@/lib/sanity/fetch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  if (!page) {
    return NextResponse.json({ error: "Missing page param" }, { status: 400 });
  }
  const content = await getPageContent(page);
  return NextResponse.json(content ?? {});
}
