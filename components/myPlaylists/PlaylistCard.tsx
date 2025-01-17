import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PlaylistWithTracks } from "../../utils/types";
import { msToMinutesAndSeconds } from "../../utils/functions";
import { useSpotifyPlayer } from "../../lib/spotify-player-context";
import { routes } from "../../utils/constants";
import Link from "next/link";

const PlaylistCard = ({ playlist }: { playlist?: PlaylistWithTracks }) => {
  const theme = useTheme();
  const { handlePlayTrack } = useSpotifyPlayer();
  return (
    <Card
      sx={{
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Link href={`${routes.playlists}/${playlist?.id}`} passHref>
        <Box display="flex" padding={1}>
          <CardMedia
            component="img"
            image={playlist?.images[0].url}
            alt="Aretha Sings The Blues"
            sx={{ width: 150, height: 150, borderRadius: 1 }}
          />
          <CardContent sx={{ paddingBottom: "0 !important" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {playlist?.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {playlist?.owner.display_name}
            </Typography>
            <Typography variant="body1" color="primary" fontWeight="bold">
              {playlist?.tracks.total} Songs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              618 Views
            </Typography>
          </CardContent>
        </Box>
      </Link>
      <List>
        {playlist?.ActualTracks.map((track, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{ paddingBottom: 0, paddingTop: 0 }}
              secondaryAction={
                <IconButton edge="end" aria-label="more">
                  <MoreVertIcon sx={{ color: "#9c27b0" }} />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  src={track.album.images[0].url}
                  alt={track.name}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                onClick={() => handlePlayTrack([track.uri])}
                primary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.artists[0].name}
                  </Typography>
                }
              />
              <Typography variant="body2" color="text.secondary">
                {msToMinutesAndSeconds(track.duration_ms)}
              </Typography>
            </ListItem>
            {index < playlist.ActualTracks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};

export default PlaylistCard;
