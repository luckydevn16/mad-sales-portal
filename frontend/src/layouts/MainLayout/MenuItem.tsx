import React from "react";

import { Box, ButtonBase } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface MenuItemProps {
  url: string;
  label: string;
  icon: React.ReactNode;
}

export function MenuItem({ url, label, icon }: MenuItemProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(url);

  return (
    <Box sx={{ pr: 2, mb: 1 }}>
      <ButtonBase
        component={Link}
        to={url}
        sx={{
          width: 1,
          height: 40,
          pl: 3,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 3,
          backgroundColor: isActive ? "primary.main" : "common.white",
          color: isActive ? "common.white" : "primary.main",
          "&:hover": {
            backgroundColor: "primary.light",
            color: "common.white",
          },
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {icon}
        <Box sx={{ fontSize: 14 }}>{label}</Box>
      </ButtonBase>
    </Box>
  );
}
