import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

// header style
const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

interface Props {
  border?: boolean;
  boxShadow?: boolean;
  contentSX?: Record<string, any>;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: Record<string, any>;
  title?: any;
  content?: boolean;
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const MainCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        sx={{
          border: border ? "1px solid" : "none",
          borderRadius: 2,
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.divider
              : theme.palette.grey[800],
          boxShadow:
            boxShadow && (!border || theme.palette.mode === "dark")
              ? shadow || theme.shadows
              : "inherit",
          ":hover": {
            boxShadow: boxShadow ? shadow || theme.shadows : "inherit",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: "subtitle1" }}
            title={title}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {};

export default MainCard;
