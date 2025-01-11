import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS as dndCSS } from "@dnd-kit/utilities";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AlbumTracksItem } from "../../../utils/types";
import { msToMinutesAndSeconds } from "../../../utils/functions";
import { useSpotifyPlayer } from "../../../lib/spotify-player-context";

interface SortableItemProps {
  item: AlbumTracksItem;
  imageSrc?: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, imageSrc }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const theme = useTheme();

  const duration = useMemo(
    () => msToMinutesAndSeconds(item.duration_ms),
    [item.duration_ms]
  );

  const { handlePlayTrack } = useSpotifyPlayer();

  const style: React.CSSProperties = {
    transform: dndCSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
    // backgroundColor: isDragging
    //   ? theme.palette.action.hover
    //   : theme.palette.background.paper,
    marginBottom: "5px",
    borderRadius: "4px",
    position: isDragging ? "relative" : "static",
    display: "flex",
    alignItems: "center",
    padding: "8px",
    color: theme.palette.text.primary,
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes} disableGutters>
      <ListItemAvatar
        onClick={() => {
          console.log("Avatar clicked");
        }}
      >
        <Avatar
          src={imageSrc}
          alt="Album image"
          variant="square"
          sx={{ borderRadius: theme.shape.borderRadius }}
        />
      </ListItemAvatar>
      <ListItemText
        onPointerDown={(e) => {
          e.stopPropagation();
          console.log("Track clicked with PointerDown");
          handlePlayTrack([item.uri]);
        }}
        primary={item.name}
        secondary={item.artists[0].name}
        sx={{
          marginLeft: "10px",
          "& .MuiTypography-root": {
            fontSize: "0.85rem",
          },
          "& .MuiTypography-body1": {
            fontSize: "1rem",
            fontWeight: "bold",
          },
          "& .MuiTypography-body2": {
            color: theme.palette.text.secondary,
          },
        }}
      />
      <div
        style={{
          marginLeft: "auto",
          marginRight: "10px",
          fontSize: "0.9rem",
          // color: theme.palette.text.secondary,
        }}
      >
        {duration}
      </div>
      <IconButton {...listeners}>
        <MoreVertIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
    </ListItem>
  );
};

export default SortableItem;
