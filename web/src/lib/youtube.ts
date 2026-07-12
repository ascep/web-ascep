export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export async function fetchPlaylistVideos(
  apiKey: string,
  playlistId: string,
  maxResults = 20
): Promise<YouTubeVideo[]> {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error ${res.status}: ${text}`);
  }

  const data = await res.json();

  if (!data.items || !Array.isArray(data.items)) {
    return [];
  }

  return data.items
    .filter((item: { snippet?: { resourceId?: { videoId?: string } } }) => item?.snippet?.resourceId?.videoId)
    .map((item: {
      snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: { high?: { url: string }; standard?: { url: string }; maxres?: { url: string } };
        resourceId: { videoId: string };
      };
    }) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.standard?.url ||
        item.snippet.thumbnails?.high?.url ||
        "",
      publishedAt: item.snippet.publishedAt,
    }));
}
