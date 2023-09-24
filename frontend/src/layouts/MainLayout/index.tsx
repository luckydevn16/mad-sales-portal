import { useState } from "react";

import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  ButtonBase,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MdLogout } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Scrollbars } from "react-custom-scrollbars-2";
import { enqueueSnackbar } from "notistack";

import Logo from "./Logo";
import { MenuItem } from "./MenuItem";
import { menus } from "./menus";
import User from "./User";

import { RootState } from "store";
import { setAuth } from "store/auth";
import { apiLogout } from "utils/api";

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const role = auth.user?.role;

  const handleSignOut = async () => {
    await apiLogout()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAuth({ initialized: false, user: null }));
          navigate("/login", { replace: true });
        }
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again later", {
          variant: "error",
        });
      });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ width: 1, height: 1, display: "flex" }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          anchor="left"
          open={isMobile ? openDrawer : true}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            elevation: 8,
            sx: {
              width: 200,
              backgroundColor: "common.white",
              display: "flex",
              flexDirection: "column",
            },
          }}
          sx={{ width: 200, height: "100vh" }}
          onClose={() => {
            if (isMobile) setOpenDrawer(false);
          }}
        >
          <Scrollbars autoHide universal>
            <Logo />

            {menus
              .filter((m) => _.includes(m.roles, role))
              .map((menu) => (
                <MenuItem
                  key={menu.url}
                  url={menu.url}
                  label={menu.label}
                  icon={menu.icon}
                />
              ))}

            <Box sx={{ pr: 2, mb: 1 }}>
              <ButtonBase
                onClick={handleSignOut}
                sx={{
                  width: 1,
                  height: 40,
                  pl: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 3,
                  backgroundColor: "common.white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "common.white",
                  },
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              >
                <MdLogout />
                <Box sx={{ fontSize: 14 }}>Sign out</Box>
              </ButtonBase>
            </Box>
          </Scrollbars>
        </Drawer>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            color="inherit"
            position="relative"
            sx={{
              height: 64,
              px: 2,
              flexDirection: "row",
              alignItems: "center",
              zIndex: 5,
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {isMobile && (
                <IconButton
                  sx={{ color: "primary.main" }}
                  onClick={() => setOpenDrawer(true)}
                >
                  <Menu />
                </IconButton>
              )}
            </Box>

            <User onSignOut={handleSignOut} />
          </AppBar>

          <Box sx={{ height: "calc(100% - 64px)" }}>
            <Scrollbars autoHide universal>
              <Outlet />
            </Scrollbars>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
