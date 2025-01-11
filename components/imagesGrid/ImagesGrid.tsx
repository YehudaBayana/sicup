"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { Album } from "../../utils/types";
import { routes } from "../../utils/constants";
import Link from "next/link";

interface ImageGridProps {
  items: Album[];
  itemsType: (typeof routes)[keyof typeof routes];
}

const ImageGrid: React.FC<ImageGridProps> = ({ items, itemsType }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Prevent mismatched rendering
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 3,
      }}
    >
      {items.map((album, index) => (
        <Box key={index}>
          <Link href={`${itemsType}/${album.id}`} passHref>
            <Card sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                image={album.images[0]?.url}
                alt={album.name}
                sx={{ borderRadius: "8px" }}
              />
              <CardContent
                sx={{ padding: "5px", paddingBottom: "5px !important" }}
              >
                <Typography sx={{ textDecoration: "none" }} variant="subtitle1" component="div" noWrap>
                  {album.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {album.artists[0]?.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default ImageGrid;
