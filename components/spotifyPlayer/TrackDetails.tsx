import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Artist } from "../../utils/types";
import SidebarLogo from "../sidebar/SidebarLogo";

interface TrackDetailsProps {
  currentTrack: {
    name: string;
    artists: Artist[];
  } | null;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({ currentTrack }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      width: "100%",
      padding: "4px",
      border: `2px solid`,
      borderRadius: 2,
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
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {currentTrack.name}
          </Typography>
          <Typography variant="body2">
            {currentTrack.artists.map((artist) => artist.name).join(", ")}
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
  </Box>
);

export default TrackDetails;
