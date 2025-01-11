import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";

interface LeftControlsProps {
  isPaused: boolean;
  handlePlay: () => void;
  handleResume: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
}

const LeftControls: React.FC<LeftControlsProps> = ({
  isPaused,
  handlePlay,
  handleResume,
  handlePause,
  handleNext,
  handlePrevious,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <IconButton>
        <ShuffleIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
      <IconButton onClick={handlePrevious}>
        <SkipPreviousIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
      <IconButton
        onClick={
          isPaused
            ? () => {
                handlePlay();
                handleResume();
              }
            : handlePause
        }
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: "50%",
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }}
      >
        <PlayArrowIcon />
      </IconButton>
      <IconButton aria-label="skip next" onClick={handleNext}>
        <SkipNextIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
      <IconButton>
        <RepeatIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
    </Box>
  );
};

export default LeftControls;
