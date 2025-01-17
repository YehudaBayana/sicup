import { useEffect, useState } from "react";
import { PlaylistWithTracks, Track } from "../../../utils/types";
import { useSpotifyGetMyPlaylists } from "../spotifyHooks";
import SpotifyApi from "../spotifyApi";

const spotify = new SpotifyApi();
export const useEnhancedPlaylists = () => {
  const {
    data: playlistsData,
    isLoading: isPlaylistsLoading,
    isError: isPlaylistsError,
  } = useSpotifyGetMyPlaylists();
  const [enhancedPlaylists, setEnhancedPlaylists] = useState<
    PlaylistWithTracks[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistsWithTracks = async () => {
      if (!playlistsData || isPlaylistsLoading || isPlaylistsError) {
        setLoading(false);
        return;
      }

      const playlists = playlistsData.items;
      const enhanced: PlaylistWithTracks[] = await Promise.all(
        playlists.map(async (playlist) => {
          try {
            const tracksData = await spotify.getPlaylistTracks(playlist.id);

            const firstFiveTracks: Track[] = tracksData.items
              .map((item) => item.track)
              .slice(0, 5);

            return {
              ...playlist,
              //   tracks: playlist.tracks,
              ActualTracks: firstFiveTracks, // Add the ActualTracks property
            };
          } catch (error) {
            console.error(
              `Error fetching tracks for playlist ${playlist.id}:`,
              error
            );
            return {
              ...playlist,
              //   tracks: {total:0,href:""},
              ActualTracks: [], // Add the ActualTracks property in case of an error
            };
          }
        })
      );

      setEnhancedPlaylists(enhanced);
      setLoading(false);
    };

    fetchPlaylistsWithTracks();
  }, [playlistsData, isPlaylistsLoading, isPlaylistsError]);

  return {
    enhancedPlaylists,
    loading,
    error: isPlaylistsError,
  };
};
