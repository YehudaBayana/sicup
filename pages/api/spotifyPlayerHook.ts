import { useEffect, useState, useRef, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useSession } from "next-auth/react";
import _ from "lodash";
import { SpotifyPlayerProviderProps } from "../../lib/sporify-player-context";
import { AlbumTracksItem } from "../../utils/types";

export const useSpotifyPlayerHook = (): SpotifyPlayerProviderProps => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<AlbumTracksItem | null>(
    null
  );
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const api = useRef(new SpotifyWebApi());
  const session = useSession();
  const accessToken = session.data?.accessToken;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (accessToken) {
      api.current.setAccessToken(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const loadSpotifySDK = () => {
      if (!document.getElementById("spotify-web-playback-sdk")) {
        const script = document.createElement("script");
        script.id = "spotify-web-playback-sdk";
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.onload = initializePlayer;
        document.body.appendChild(script);
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      const Spotify = (window as any).Spotify;

      if (!Spotify) {
        console.error("Spotify SDK failed to load.");
        return;
      }

      const spotifyPlayer = new Spotify.Player({
        name: "Custom Spotify Player",
        getOAuthToken: (cb: (token: string) => void) => cb(accessToken),
        volume: 0.5,
      });

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener(
        "ready",
        ({ device_id }: { device_id: string }) => {
          console.log("Ready with Device ID:", device_id);
          setDeviceId(device_id);
        }
      );

      spotifyPlayer.addListener("player_state_changed", (state: any) => {
        if (!state) return;

        console.log("Player State Changed:", state);
        setIsPaused(state.paused);
        setCurrentTrack(state.track_window.current_track);
        setPosition(state.position);
        setDuration(state.duration);
      });

      spotifyPlayer.addListener("initialization_error", ({ message }: any) =>
        console.error("Initialization error:", message)
      );
      spotifyPlayer.addListener("authentication_error", ({ message }: any) =>
        console.error("Authentication error:", message)
      );
      spotifyPlayer.addListener("account_error", ({ message }: any) =>
        console.error("Account error:", message)
      );
      spotifyPlayer.addListener("playback_error", ({ message }: any) =>
        console.error("Playback error:", message)
      );

      spotifyPlayer.connect();
    };

    loadSpotifySDK();

    return () => {
      player?.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [accessToken]);

  useEffect(() => {
    if (player && !isPaused) {
      intervalRef.current = setInterval(() => {
        player.getCurrentState().then((state) => {
          if (state) {
            setPosition(state.position);
            setDuration(state.duration);
          }
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [player, isPaused]);

  const debouncedSeek = useCallback(
    _.debounce((newPosition: number) => {
      if (player) {
        player
          .seek(newPosition)
          .catch((err) => console.error("Failed to seek:", err));
      }
    }, 300),
    [player]
  );

  const handleSliderChange = (_: Event, value: number | number[]) => {
    setPosition(value as number);
    debouncedSeek(value as number);
  };

  const handlePlayTrack = async (trackUris: string[]) => {
    if (!deviceId) {
      console.error("Device ID is missing.");
      return;
    }

    try {
      await api.current.play({
        device_id: deviceId,
        uris: trackUris,
      });
      console.log("Playing track:", trackUris);
    } catch (error) {
      console.error("Failed to play track:", error);
    }
  };

  const handlePlay = async () => {
    if (!deviceId) {
      console.error("Device ID is missing.");
      return;
    }

    try {
      await api.current.play({ device_id: deviceId });
    } catch (error) {
      console.error("Failed to start playback:", error);
    }
  };

  const handlePause = async () => {
    if (player) {
      try {
        await player.pause();
      } catch (error) {
        console.error("Failed to pause playback:", error);
      }
    }
  };

  const handleResume = async () => {
    if (player) {
      try {
        await player.resume();
      } catch (error) {
        console.error("Failed to resume playback:", error);
      }
    }
  };

  const handleNext = async () => {
    try {
      await api.current.skipToNext();
    } catch (error) {
      console.error("Failed to skip to next track:", error);
    }
  };

  const handlePrevious = async () => {
    try {
      await api.current.skipToPrevious();
    } catch (error) {
      console.error("Failed to skip to previous track:", error);
    }
  };

  return {
    player,
    deviceId,
    isPaused,
    currentTrack,
    position,
    duration,
    handlePlayTrack, // Include this
    handleResume,
    handlePause,
    handleNext,
    handlePrevious,
    handleSliderChange,
    handlePlay,
    session,
    setPlayer,
    setDeviceId,
    setIsPaused,
    setCurrentTrack,
  };
};
