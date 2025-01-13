"use client";

import React, { useEffect, useState } from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Album, MyPlaylistItem } from "../../utils/types";
import { routes } from "../../utils/constants";
import Link from "next/link";

interface ImageGridProps {
  items: Album[] | MyPlaylistItem[];
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
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {items.map((item, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
          <Link href={`${itemsType}/${item.id}`} passHref>
            <Card sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                image={item.images[0]?.url}
                alt={item.name}
                sx={{ borderRadius: "8px" }}
              />
              <CardContent
                sx={{ padding: "5px", paddingBottom: "5px !important" }}
              >
                <Typography
                  sx={{ textDecoration: "none" }}
                  variant="subtitle1"
                  component="div"
                  noWrap
                >
                  {item.name}
                </Typography>
                {item.artists && (
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.artists[0]?.name}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGrid;
