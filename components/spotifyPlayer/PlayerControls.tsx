import React from "react";
import { Box, Button } from "@mui/material";

interface PlayerControlsProps {
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPaused,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button onClick={onPrevious}>Previous</Button>
      <Button variant="contained" onClick={isPaused ? onPlay : onPause}>
        {isPaused ? "Play" : "Pause"}
      </Button>
      <Button onClick={onNext}>Next</Button>
    </Box>
  );
};

export default PlayerControls;
