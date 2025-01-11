import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from '../../app/theme';
import { Variant } from '@mui/material/styles/createTypography';

interface SidebarLogoProps {
  width?: number;
  height?: number;
  marginBottom?: number;
  marginBottomTwo?: number;
  variant?: Variant;
}
const SidebarLogo: React.FC<SidebarLogoProps> = ({
  width = 80,
  height = 80,
  marginBottom = 3,
  marginBottomTwo = 1,
  variant = "h5"
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom,
      }}
    >
      <Box
        sx={{
          width,
          height,
          backgroundColor: colors.main.primary,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: marginBottomTwo,
        }}
      >
        <Typography variant={variant} sx={{ fontWeight: "bold" }}>
          Sic-up
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarLogo;
