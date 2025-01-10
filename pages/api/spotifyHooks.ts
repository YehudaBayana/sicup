import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "../../lib/spotify-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/constants";

export const useSpotifyGetMe = () => {
  const spotify = useSpotify();

  return useQuery({
    queryKey: QueryKeys.Me,
    queryFn: async () => {
      return await spotify.getMe();
    },
  });
};

export const useSpotifyGetMyPlaylists = () => {
  const spotify = useSpotify();

  return useQuery({
    queryKey: QueryKeys.MyPlaylists,
    queryFn: async () => {
      return await spotify.getMyPlaylists();
    },
  });
};

export const useSpotifyGetMyAlbums = () => {
  const spotify = useSpotify();

  return useQuery({
    queryKey: QueryKeys.MyAlbums,
    queryFn: async () => {
      return await spotify.getMyAlbums();
    },
  });
};
export const useSpotifyGetAlbumsTracks = (albumId: string) => {
  const spotify = useSpotify();
  return useQuery({
    queryKey: QueryKeys.Album(albumId),
    queryFn: async () => {
      return await spotify.getAlbumsTracks(albumId);
    },
  });
};

// POST: Add a track to a playlist
export const useAddTrackToPlaylist = () => {
  const spotify = useSpotify();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      playlistId,
      uris,
    }: {
      playlistId: string;
      uris: string[];
    }) => {
      return await spotify.addTrackToPlaylist(playlistId, uris);
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.MyPlaylists });
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Playlist(playlistId),
      });
    },
  });
};

// PUT: Update a playlist's details
export const useUpdatePlaylistDetails = () => {
  const spotify = useSpotify();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      playlistId,
      data,
    }: {
      playlistId: string;
      data: { name?: string; description?: string; public?: boolean };
    }) => {
      return await spotify.updatePlaylistDetails(playlistId, data);
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.MyPlaylists });
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Playlist(playlistId),
      });
    },
  });
};

// DELETE: Remove a track from a playlist
export const useRemoveTrackFromPlaylist = () => {
  const spotify = useSpotify();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      playlistId,
      uris,
    }: {
      playlistId: string;
      uris: string[];
    }) => {
      return await spotify.removeTrackFromPlaylist(playlistId, uris);
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.MyPlaylists });
      queryClient.invalidateQueries({
        queryKey: QueryKeys.Playlist(playlistId),
      });
    },
  });
};
