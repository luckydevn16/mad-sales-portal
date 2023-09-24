import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#ec2127",
    },
  },

  typography: {
    button: {
      textTransform: "none",
    },
  },
};

const defaultTheme = createTheme(themeOptions);

export default defaultTheme;
