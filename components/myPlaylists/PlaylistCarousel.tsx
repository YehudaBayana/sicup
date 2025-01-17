import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlaylistCard from "./PlaylistCard";
import { PlaylistWithTracks } from "../../utils/types";

const PlaylistCarousel = ({
  playlists,
}: {
  playlists: PlaylistWithTracks[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsToShow = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, playlists.length - cardsToShow)
    );
  };

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
        }}
      >
        {playlists.map((playlist) => (
          <Box
            key={playlist.id}
            sx={{ flex: `0 0 calc(100% / ${cardsToShow})`, p: 1 }}
          >
            <PlaylistCard playlist={playlist} />
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handlePrev}
        disabled={currentIndex === 0}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        disabled={currentIndex >= playlists.length - cardsToShow}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default PlaylistCarousel;
