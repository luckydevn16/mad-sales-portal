import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";

import QuoteTable from "./QuoteTable";

import { SITE_TITLE } from "utils/config";

export default function Quote() {
  return (
    <>
      <Helmet>
        <title>{SITE_TITLE} | Quotes</title>
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
            Quotes
          </Box>
        </Box>

        <Box className="dx-viewport" sx={{ height: "calc(100% - 108px)" }}>
          <QuoteTable />
        </Box>
      </Box>
    </>
  );
}
