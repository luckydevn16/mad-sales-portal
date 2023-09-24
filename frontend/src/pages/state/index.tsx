import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";

import StateTable from "./StateTable";

import { SITE_TITLE } from "utils/config";

export default function State() {
  return (
    <>
      <Helmet>
        <title>{SITE_TITLE} | States</title>
      </Helmet>

      <Box sx={{ height: 1, p: 4, backgroundColor: "grey.A200" }}>
        <Box
          sx={{
            width: 1,
            height: 36,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              color: "common.black",
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            States
          </Box>
        </Box>

        <Box sx={{ height: "calc(100% - 108px)" }}>
          <StateTable />
        </Box>
      </Box>
    </>
  );
}
