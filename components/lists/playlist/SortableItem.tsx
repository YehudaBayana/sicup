import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS as dndCSS } from "@dnd-kit/utilities";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AlbumTracksItem } from "../../../utils/types";
import { msToMinutesAndSeconds } from "../../../utils/functions";
import { useSpotifyPlayer } from "../../../lib/sporify-player-context";

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

  const duration = useMemo(
    () => msToMinutesAndSeconds(item.duration_ms),
    [item.duration_ms]
  );

  const { handlePlayTrack } = useSpotifyPlayer();

  const style: React.CSSProperties = {
    transform: dndCSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
    backgroundColor: isDragging ? "#3a3a3a" : "#4f4f4f",
    marginBottom: "5px",
    borderRadius: "4px",
    position: isDragging ? "relative" : "static",
    display: "flex",
    alignItems: "center",
    padding: "8px",
    color: "white",
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes} disableGutters>
      <ListItemAvatar
        onClick={() => {
          console.log("Avatar clicked");
        }}
      >
        <Avatar src={imageSrc} alt="Album image" variant="square" />
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
            color: "#cccccc",
          },
        }}
      />
      <div
        style={{ marginLeft: "auto", marginRight: "10px", fontSize: "0.9rem" }}
      >
        {duration}
      </div>
      <IconButton {...listeners}>
        <MoreVertIcon style={{ color: "#c084f0" }} />
      </IconButton>
    </ListItem>
  );
};

export default SortableItem;
