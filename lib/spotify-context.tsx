"use client";
import React, { createContext, useContext } from "react";
import spotify from "../pages/api/spotifyService";
import SpotifyApi from "../pages/api/spotifyApi";

const SpotifyContext = createContext<SpotifyApi | null>(null);

export const SpotifyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SpotifyContext.Provider value={spotify}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = (): SpotifyApi => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
