// app/dashboard/page.tsx
import { fetchSpotifyData } from "../../lib/spotify";

async function getSpotifyData() {
  const token = "your-access-token"; // Replace with token management logic.
  return fetchSpotifyData("/me/playlists", token);
}

export default async function DashboardPage() {
  const playlists = await getSpotifyData();

  return (
    <div>
      <h1>Your Playlists</h1>
      <ul>
        {playlists.items.map((playlist: any) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}
