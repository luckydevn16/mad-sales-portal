import { Box } from "@mui/material";
import { LogoSection } from "components";

import config, { siteTitle } from "config";

export default function Logo() {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 6,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          color: "common.white",
        }}
      >
        <LogoSection width={75} height={75} to={config.defaultPath} />
      </Box>

      <Box
        sx={{
          color: "primary.main",
          fontSize: 12,
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        {siteTitle}
      </Box>
    </Box>
  );
}
