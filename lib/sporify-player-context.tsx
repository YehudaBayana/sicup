"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { SessionContextValue } from "next-auth/react";
import { useSpotifyPlayerHook } from "../pages/api/spotifyPlayerHook";
import { AlbumTracksItem } from "../utils/types";

export interface SpotifyPlayerProviderProps {
  player: Spotify.Player | null;
  deviceId: string | null;
  isPaused: boolean;
  currentTrack: AlbumTracksItem | null;
  position: number;
  duration: number;
  handlePlayTrack: (trackUris: string[]) => void; // Include this
  handleResume: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSliderChange: (_: Event, value: number | number[]) => void;
  handlePlay: () => void;
  session: SessionContextValue;
  setPlayer: Dispatch<SetStateAction<Spotify.Player | null>>;
  setDeviceId: Dispatch<SetStateAction<string | null>>;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  setCurrentTrack: Dispatch<SetStateAction<AlbumTracksItem | null>>;
}

const SpotifyPlayerContext = createContext<SpotifyPlayerProviderProps | null>(
  null
);

export const SpotifyPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const spotifyPlayer = useSpotifyPlayerHook();
  return (
    <SpotifyPlayerContext.Provider value={spotifyPlayer}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};

export const useSpotifyPlayer = (): SpotifyPlayerProviderProps => {
  const context = useContext(SpotifyPlayerContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
