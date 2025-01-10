// components/spotifyPlayer/SpotifyPlayers.tsx
import React from "react";
import { Box, Typography, Button, Slider } from "@mui/material";
import PlayerControls from "./PlayerControls";
import { useSpotifyPlayer } from "../../lib/sporify-player-context";
import { Artist } from "../../utils/types";

const SpotifyPlayer: React.FC = () => {
  const {
    currentTrack,
    isPaused,
    position,
    duration,
    handleResume,
    handlePause,
    handleNext,
    handlePrevious,
    handleSliderChange,
    handlePlay,
    session,
  } = useSpotifyPlayer();

  if (!session.data?.accessToken) {
    return <Typography>Please log in to use the Spotify Player.</Typography>;
  }

  return (
    <Box
      sx={{ width: 300, padding: 2, border: "1px solid #ccc", borderRadius: 2 }}
    >
      {currentTrack ? (
        <>
          <Typography variant="h6">{currentTrack.name}</Typography>
          <Typography variant="subtitle1">
            {currentTrack.artists
              .map((artist: Artist) => artist.name)
              .join(", ")}
          </Typography>
          <PlayerControls
            isPaused={isPaused}
            onPlay={handleResume}
            onPause={handlePause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
          <Slider
            value={position}
            min={0}
            max={duration}
            onChange={handleSliderChange}
          />
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
      <Button variant="outlined" onClick={handlePlay} sx={{ marginTop: 2 }}>
        Play on Device
      </Button>
    </Box>
  );
};

export default SpotifyPlayer;
