import { NextRequest, NextResponse } from "next/server";
import { fetchPlaylistVideos } from "@/lib/youtube";

export async function GET(request: NextRequest) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = request.nextUrl.searchParams.get("playlistId") || process.env.YOUTUBE_PLAYLIST_ID;

  if (!apiKey || !playlistId) {
    return NextResponse.json(
      { error: "YouTube API key or Playlist ID not configured" },
      { status: 500 }
    );
  }

  try {
    const videos = await fetchPlaylistVideos(apiKey, playlistId);
    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube videos" },
      { status: 500 }
    );
  }
}
