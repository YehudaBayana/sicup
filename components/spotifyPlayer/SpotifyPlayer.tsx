// components/spotifyPlayer/SpotifyPlayers.tsx
import React from "react";
import { Box } from "@mui/material";
import PlayerBar from "./PlayerBar";

const SpotifyPlayer: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <PlayerBar />
    </Box>
  );
};

export default SpotifyPlayer;
