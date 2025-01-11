"use client";
// app/layout.tsx
import { Box } from "@mui/material";
import Providers from "./Providers";
import "@fontsource/roboto";
import Sidebar from "../components/sidebar/Sidebar";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import createEmotionServer from "@emotion/server/create-instance";
import SpotifyPlayer from "../components/spotifyPlayer/SpotifyPlayer";
import { SIDEBAR_WIDTH } from '../utils/constants';

const clientSideEmotionCache = createEmotionCache();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useServerInsertedHTML(() => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    const emotionStyles = extractCriticalToChunks("").styles.map((style) => (
      <style
        key={style.key}
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return <>{emotionStyles}</>;
  });
  return (
    <html lang="en">
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <Providers>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                right: 0,
                width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
                height: "auto",
                zIndex: 9999
              }}
            >
              <SpotifyPlayer />
            </Box>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2, // Add spacing around the content
                marginLeft: SIDEBAR_WIDTH + "px",
                marginTop: "95px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  // Makes the sidebar and content side by side
                }}
              >
                <Sidebar />
                {children}
              </Box>
            </Box>
          </Providers>
        </CacheProvider>
      </body>
    </html>
  );
}
