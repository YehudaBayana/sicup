"use client";
import { Box, Typography } from "@mui/material";
import PlaylistCarousel from "../../components/myPlaylists/PlaylistCarousel";
import { useEnhancedPlaylists } from "../../pages/api/hastleHooks/useEnhancedPlaylists";

export default function PlaylistsPage() {
  const { enhancedPlaylists, loading, error } = useEnhancedPlaylists();

  if (loading) {
    return <h1>Loading playlists...</h1>;
  }

  if (error) {
    return <h1>Error loading playlists</h1>;
  }

  return (
    <Box sx={{ padding: 2, width: `calc(100%)` }}>
      <Typography variant="h4" gutterBottom>
        My Playlists
      </Typography>
      {enhancedPlaylists.length > 0 ? (
        <PlaylistCarousel playlists={enhancedPlaylists} />
      ) : (
        <Typography variant="body1">No playlists found.</Typography>
      )}
    </Box>
  );
}
