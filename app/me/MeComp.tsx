// app/dashboard/DashboardClient.tsx (Client Component)
"use client";

import { useSpotifyProfile } from "../../pages/api/spotifyHooks";

export default function MeComp() {
  const res = useSpotifyProfile();

  const { data, isLoading, isError, error } = res;
  if (isLoading) {
    return <h1>isLoading ...</h1>;
  }
  if (isError) {
    return <h1>error {JSON.stringify(error)}</h1>;
  }
  console.log("data ", data);
  return (
    <div>
      <h1>profile</h1>
      <h1>{data.display_name}</h1>
    </div>
  );
}
