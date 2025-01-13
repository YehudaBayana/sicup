export const SERVER_DOMAIN: string = "http://localhost:5001/";
export const SIDEBAR_WIDTH = 240;

export const QueryKeys = {
  Me: ["getProfile"] as const,
  MyPlaylists: ["getMyPlaylists"] as const,
  MyAlbums: ["getMyAlbums"] as const,
  Album: (id: string) => ["getAlbum", id] as const,
  Playlist: (id: string) => ["getPlaylist", id] as const,
  UserPlaylists: (id: string) => ["getUserPlaylists", id] as const,
  PlaylistTracks: (id: string) => ["getPlaylistTracks", id] as const,
};

export const searchMenu: string[] = [
  "tracks",
  "playlists",
  "artists",
  "episodes",
  "shows",
];

export const routes = {
  albums: "/albums",
  playlists: "/playlists",
  artists: "/artists",
  shows: "/shows",
};
export const imageUrl =
  "https://images.unsplash.com/photo-1736289150235-7dc9b851511a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4MXx8fGVufDB8fHx8fA%3D%3D";

export const drawerWidth: number = 240;
export const DRAWER_HEIGHT: number = 65;
export const PLAYLIST_CARD_WIDTH: number = 200;
export const MIN_OPEN_WIDTH: number = 210;
export const CLOSE_WIDTH: number = 70;

export const myColors = {
  main: "#A06BAF",
  background: "#555353",
  backgroundLP: "#191818",
  slider: "#B96AC9",
  secondary: "#A3A3A3",
};

export const playerClasses = [
  "_ContentRSWP",
  "_ControlsButtonsRSWP",
  "_WrapperRSWP",
  "_ContentWrapperRSWP",
];

export const SpotifyScopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-email",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
  "app-remote-control",
  "streaming",
  "user-follow-modify",
  "user-follow-read",
];

export const SpotifyAuthUrl = "https://accounts.spotify.com/authorize";
