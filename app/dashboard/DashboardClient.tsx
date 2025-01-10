"use client";

import { useSpotifyGetMyPlaylists } from "../../pages/api/spotifyHooks";

export default function DashboardClient() {
  const res = useSpotifyGetMyPlaylists();

  const { data, isLoading, isError, error } = res;
  if (isLoading) {
    return <h1>isLoading ...</h1>;
  }
  if (isError) {
    return <h1>error {JSON.stringify(error)}</h1>;
  }
  return (
    <div>
      <h1>Your Playlists</h1>
      <ul>
        {data?.items.map((playlist: any) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}
