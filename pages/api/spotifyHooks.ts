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

export const useSpotifyGetUsersPlaylists = (userId: string) => {
  const spotify = useSpotify();

  return useQuery({
    queryKey: QueryKeys.UserPlaylists(userId),
    queryFn: async () => {
      return await spotify.getUsersPlaylists(userId);
    },
    enabled: !!userId,
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
export const useSpotifyGetPlaylistsTracks = (playlistId: string) => {
  const spotify = useSpotify();

  return useQuery({
    queryKey: QueryKeys.PlaylistTracks(playlistId),
    queryFn: async () => {
      let allTracks: any[] = [];
      let nextPage: string | null = `/playlists/${playlistId}/tracks`;

      while (nextPage) {
        const response = await spotify.request(nextPage);
        const data = response as { items: any[]; next: string | null };

        allTracks = [...allTracks, ...data.items];
        nextPage = data.next ? data.next.replace(spotify.baseUrl, "") : null;
      }

      allTracks.sort(
        (a, b) =>
          new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
      );

      return {
        items: allTracks,
      };
    },
    enabled: !!playlistId,
  });
};

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
