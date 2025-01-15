import React from "react";
import { Box, useTheme } from "@mui/material";
// import { useSpotifyPlayer } from "../../lib/spotify-player-context";
import LeftControls from "./LeftControls";
import TrackDetails from "./TrackDetails";
import TimeSlider from "./TimeSlider";
import { useSpotifyPlayer } from "../../lib/spotify-player-context";
import SidebarSearch from "../sidebar/SidebarSearch";

const PlayerBar: React.FC = () => {
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
  } = useSpotifyPlayer();

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: theme.palette.background.paper,
        padding: "10px",
        width: "100%",
        gap: "20px",
      }}
    >
      <LeftControls
        isPaused={isPaused}
        handlePlay={handlePlay}
        handleResume={handleResume}
        handlePause={handlePause}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <Box sx={{ flex: 2 }}>
        <TrackDetails currentTrack={currentTrack} />
        <TimeSlider
          position={position}
          duration={duration}
          handleSliderChange={handleSliderChange}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <SidebarSearch />
      </Box>
    </Box>
  );
};

export default PlayerBar;
