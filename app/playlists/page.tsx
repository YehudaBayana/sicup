// app/Playlist/page.tsx
"use client";
import { useEffect, useState } from "react";
import ImageGrid from "../../components/imagesGrid/ImagesGrid";
import { useSpotifyGetMyPlaylists } from "../../pages/api/spotifyHooks";
import { GetMyPlaylistsResponse, MeResponse } from "../../utils/types";
import { Box, Typography } from "@mui/material";
import { routes } from "../../utils/constants";

export default function PlaylistsPage() {
  const usersPlaylistsRes = useSpotifyGetMyPlaylists();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !usersPlaylistsRes || !usersPlaylistsRes.data) {
    return <h1>Loading playlists...</h1>;
  }

  const { data, isLoading, isError, error } = usersPlaylistsRes;

  if (isLoading) {
    return <h1>Loading playlists...</h1>;
  }

  if (isError) {
    return <h1>Error: {JSON.stringify(error)}</h1>;
  }

  const playlists = Array.isArray((data as GetMyPlaylistsResponse)?.items)
    ? (data as GetMyPlaylistsResponse).items
    : [];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Playlists
      </Typography>
      {playlists.length > 0 ? (
        <ImageGrid itemsType={routes.playlists} items={playlists} />
      ) : (
        <Typography variant="body1">No playlists found.</Typography>
      )}
    </Box>
  );
}
