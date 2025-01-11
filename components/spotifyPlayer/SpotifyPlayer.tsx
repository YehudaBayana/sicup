// components/spotifyPlayer/SpotifyPlayers.tsx
import React from "react";
import { Box } from "@mui/material";
import MediaPlayer from './PlayerBar';

const SpotifyPlayer: React.FC = () => {
  return (
    <Box
      sx={{ width: "100%" }}
    >
      <MediaPlayer />
    </Box>
  );
};

export default SpotifyPlayer;
