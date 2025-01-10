// app/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "../lib/react-query";
import { SpotifyProvider } from "../lib/spotify-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  url.searchParams.delete("state");
  window.history.replaceState({}, document.title, url.pathname + url.search);

  return (
    <SessionProvider>
      <SpotifyProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </SpotifyProvider>
    </SessionProvider>
  );
}
