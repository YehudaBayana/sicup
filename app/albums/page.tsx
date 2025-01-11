// app/albums/page.tsx
"use client";
import { useEffect, useState } from "react";
import ImageGrid from "../../components/imagesGrid/ImagesGrid";
import { useSpotifyGetMyAlbums } from "../../pages/api/spotifyHooks";
import { GetMyAlbumsResponse } from "../../utils/types";
import { Box, Typography } from "@mui/material";
import { routes } from "../../utils/constants";

export default function AlbumsPage() {
  const res = useSpotifyGetMyAlbums();
  const [hydrated, setHydrated] = useState(false);
  console.log("res ", res);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Render nothing on the server
  }
  const { data, isLoading, isError, error } = res;
  if (isLoading) {
    return <h1>isLoading ...</h1>;
  }
  if (isError) {
    return <h1>error {JSON.stringify(error)}</h1>;
  }
  const items = (data as GetMyAlbumsResponse).items.map((item) => item.album);
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Albums
      </Typography>
      <ImageGrid itemsType={routes.albums} items={items} />
    </Box>
  );
}
