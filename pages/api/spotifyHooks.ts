import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "../../lib/spotify-context";

export const useSpotifyProfile = () => {
  const spotify = useSpotify();

  return useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      return await spotify.getProfile();
    },
  });
};

export const useSpotifyGetMyPlaylists = () => {
  const spotify = useSpotify();

  return useQuery({
    queryKey: ["getMyPlaylists"],
    queryFn: async () => {
      return await spotify.getMyPlaylists();
    },
  });
};
