/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "store";

interface Props {
  onSignOut: Function;
}

const User: React.FC<Props> = ({ onSignOut }) => {
  const auth = useSelector((state: RootState) => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={handleOpenMenu}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
      >
        <Avatar
          alt={`${auth.user?.firstName ?? ""} ${auth.user?.lastName ?? ""}`}
          src={
            !auth.user?.firstName && !auth.user?.lastName
              ? undefined
              : `${auth.user?.firstName ?? ""} ${auth.user?.lastName ?? ""}`
          }
          sx={{ width: 24, height: 24, backgroundColor: "primary.main" }}
        />

        <Box sx={{ color: "primary.main", fontSize: 12 }}>
          {`${auth.user?.firstName ?? ""} ${auth.user?.lastName ?? ""}`}
        </Box>
      </Box>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{ mt: "50px" }}
      >
        <MenuItem dense component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>

        <MenuItem dense onClick={() => onSignOut()}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default User;
