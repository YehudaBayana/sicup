import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Slider,
  useTheme,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Artist } from "../../utils/types";
import { useSpotifyPlayer } from "../../lib/sporify-player-context";
import SidebarLogo from "../sidebar/SidebarLogo";

const MediaPlayer: React.FC = () => {
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
    <>
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
        {/* Left Controls */}
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
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <PlayArrowIcon />
          </IconButton>
          <IconButton onClick={handleNext}>
            <SkipNextIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <IconButton>
            <RepeatIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Box>

        {/* Track Info and Slider */}
        <Grid2
          container
          direction="column"
          alignItems="center"
        // sx={{ flex: 1 }}
        >
          <Grid2
            container
            direction="column"
            alignItems="center"
            sx={{
              // padding: "6px",
              width: "400px", // Fixed width for song details box
              gap: "4px",
            }}
          >
            {/* Track Details */}
            <Grid2
              container
              alignItems="center"
              sx={{
                display: "flex",
                gap: "16px",
                width: "100%",
                padding: "4px",
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <Avatar
                alt="Track Cover"
                src="/musicNote.svg" // Replace with the actual cover image URL
                sx={{ width: "48px", height: "48px", borderRadius: "4px" }}
              />
              <Box sx={{ textAlign: "center", flex: 1 }}>
                {currentTrack ? (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.light,
                        fontWeight: "bold",
                      }}
                    >
                      {currentTrack.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {currentTrack.artists
                        .map((artist: Artist) => artist.name)
                        .join(", ")}
                    </Typography>
                  </>
                ) : (
                  <SidebarLogo
                    variant="body2"
                    marginBottom={0}
                    marginBottomTwo={0}
                    width={50}
                    height={50}
                  />
                )}
              </Box>
            </Grid2>
            <Divider />
            {/* Slider */}
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              max={duration}
              onChange={handleSliderChange}
              sx={{
                padding: 0,
                width: "97%", // Matches the width of the song details box
                height: 4,
                "& .MuiSlider-thumb": {
                  width: 8,
                  height: 8,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&.Mui-active": {
                    width: 20,
                    height: 20,
                  },
                },
              }}
            />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default MediaPlayer;
