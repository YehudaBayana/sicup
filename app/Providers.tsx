// app/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "../lib/react-query";
import { SpotifyProvider } from "../lib/spotify-context";
import { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
// import { theme } from "./theme";
import { SpotifyPlayerProvider } from "../lib/spotify-player-context";
import { darkTheme } from "./theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("code") || url.searchParams.has("state")) {
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.replaceState(
          {},
          document.title,
          url.pathname + url.search
        );
      }
    }
  }, []);

  return (
    <SessionProvider>
      <SpotifyProvider>
        <SpotifyPlayerProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </SpotifyPlayerProvider>
      </SpotifyProvider>
    </SessionProvider>
  );
}
