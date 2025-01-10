"use client";

import { useEffect, useState } from "react";
import { useSpotifyGetMyAlbums } from "../../../pages/api/spotifyHooks";
import { AlbumTracksItem, GetMyAlbumsResponse } from "../../../utils/types";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import DragAndDropList from "../../../components/lists/playlist/DragAndDropList";

export default function AlbumsPage() {
  const params = useParams(); // Get params from URL
  const id = params?.id as string; // Explicitly cast `id` to a string
  const res = useSpotifyGetMyAlbums();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Render nothing on the server
  }

  const { data, isLoading, isError } = res;

  if (isLoading) {
    return null; ///<h1>isLoading ...</h1>;
  }
  if (isError) {
    return null; // <h1>Error: {JSON.stringify(error)}</h1>;
  }
  const currAlbum = (data as GetMyAlbumsResponse).items.find(
    (item) => item.album.id === id
  )?.album;
  const items = currAlbum?.tracks.items;

  return (
    <Box sx={{ width: "100%", margin: 0 }}>
      <Typography variant="h4" gutterBottom>
        album sings
      </Typography>
      <DragAndDropList
        isDraggable={false}
        listItems={(items || []) as AlbumTracksItem[]}
        imageSrc={currAlbum?.images[0].url}
      />
    </Box>
  );
}

// "use client";
// // app/albums/[id]/page.tsx
// import { useEffect, useState } from "react";
// import { useSpotifyGetMyAlbums } from "../../../pages/api/spotifyHooks";
// import { AlbumTracksItem, GetMyAlbumsResponse } from "../../../utils/types";
// import { Box, Typography } from "@mui/material";
// import { useRouter } from "next/router";
// import DragAndDropList from "../../../components/lists/playlist/DragAndDropList";
// import { useParams } from "next/navigation";

// export default function AlbumsPage() {
//   const params = useParams(); // Get params from URL
//   const id = params?.id as string; // Explicitly cast `id` to a string
//   const res = useSpotifyGetMyAlbums();
//   //   const router = useRouter();
//   const [hydrated, setHydrated] = useState(false);
//   console.log("res ", res);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   if (!hydrated) {
//     return null; // Render nothing on the server
//   }
//   const { data, isLoading, isError, error } = res;
//   if (isLoading) {
//     return <h1>isLoading ...</h1>;
//   }
//   if (isError) {
//     return <h1>error {JSON.stringify(error)}</h1>;
//   }

//   const items = (data as GetMyAlbumsResponse).items.find(
//     (item) => item.album.id === id
//   )?.album;

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Recently Added
//       </Typography>
//       <DragAndDropList
//         isDraggable={false}
//         listItems={(items || []) as AlbumTracksItem[]}
//       />
//       {/* <ImageGrid itemsType={routes.albums} items={(items || [] ) as Album[]} /> */}
//     </Box>
//   );
// }
