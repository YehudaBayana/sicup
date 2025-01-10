// app/dashboard/page.tsx (Server Component)
import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { fetchSpotifyData } from "@/lib/spotify";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import MeComp from "./MeComp";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <div>Please log in to view your playlists.</div>;
  }

  const playlists = await fetchSpotifyData(
    "/me/playlists",
    session.accessToken
  );

  return <MeComp />;
}
