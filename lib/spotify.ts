// lib/spotify.ts
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

export const fetchSpotifyData = async (endpoint: string, token: string) => {
  const res = await fetch(`${SPOTIFY_API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Spotify API Error: ${res.statusText}`);
  }

  return res.json();
};
