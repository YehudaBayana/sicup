"use client";
import { useEffect, useState } from "react";
import { useSpotifyGetPlaylistsTracks } from "../../../pages/api/spotifyHooks";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import _ from "lodash";
import DragAndDropList from "../../../components/lists/playlist/DragAndDropList";

export default function PlaylistPage() {
  const params = useParams(); // Get params from URL
  const id = params?.id as string;

  if (!id) {
    return <Typography variant="h6">Invalid playlist ID.</Typography>;
  }

  const playlistTracksRes = useSpotifyGetPlaylistsTracks(id);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!playlistTracksRes || !hydrated) {
    return null;
  }

  const { data, isLoading, isError } = playlistTracksRes;

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6">Failed to load playlist.</Typography>;
  }

  const tracks = (data?.items ?? []).map((item) => item.track);
  const uniqueTracks = _.uniqBy(tracks, "id");

  return (
    <Box sx={{ width: "100%", margin: 0 }}>
      <Typography variant="h4" gutterBottom>
        Playlist Songs
      </Typography>
      <DragAndDropList isDraggable={true} listItems={uniqueTracks} />
    </Box>
  );
}
