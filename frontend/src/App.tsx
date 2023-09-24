import { useEffect } from "react";

import { Loader } from "@googlemaps/js-api-loader";
import { useDispatch, useSelector } from "react-redux";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { ConfirmProvider } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";

import Routes from "routes";
import { RootState } from "store";
import { setAuth } from "store/auth";
import { apiCheckAuth } from "utils/api";
import defaultTheme from "theme/theme";
import defaultConfirm from "theme/confirm";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.initialized) return;

    const checkAuth = async () => {
      await apiCheckAuth()
        .then((res) => {
          if (res.status === 200) {
            dispatch(setAuth({ initialized: true, user: res.data }));
          } else {
            dispatch(setAuth({ initialized: true, user: null }));
          }
        })
        .catch(() => {
          dispatch(setAuth({ initialized: true, user: null }));
          enqueueSnackbar("Internal Server Error. Please try again later.", {
            variant: "error",
          });
        });
    };

    checkAuth();
  }, [auth]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        // enqueueSnackbar("Google Map API has been successfully loaded.", {
        //   variant: "success",
        // });
      })
      .catch(() => {
        enqueueSnackbar(
          "Google Map API has not been successfully loaded. Please try again later.",
          {
            variant: "error",
          }
        );
      });
  }, []);

  if (!auth.initialized) {
    return <></>;
  }

  return (
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />

          <ConfirmProvider defaultOptions={defaultConfirm}>
            <Routes />
          </ConfirmProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </HelmetProvider>
  );
};

export default App;
