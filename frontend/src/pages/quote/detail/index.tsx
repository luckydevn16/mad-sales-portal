import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { SITE_TITLE } from "utils/config";

import Summary from "./Summary";
import Notes from "./Notes";
import Files from "./Files";
import { apiGetQuote } from "utils/api";

export default function Detail() {
  const { id = "" } = useParams();
  const [quote, setQuote] = useState<QuoteType>();

  useEffect(() => {
    const getQuote = async () => {
      if (id) {
        await apiGetQuote({ id })
          .then((res) => {
            const quoteData: QuoteType = res.data.quote;
            quoteData.salesPerson =
              quoteData.state &&
              quoteData.state.users &&
              quoteData.state.users
                .map((user) => `${user.firstName} ${user.lastName}`)
                .join(", ");
            setQuote(res.data.quote);
          })
          .catch(() => {
            enqueueSnackbar("Something went wrong. Please try again later", {
              variant: "error",
            });
          });
      }
    };

    getQuote();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>
          {SITE_TITLE} | Quotes | {quote ? quote.quoteId : ""}
        </title>
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
            Quotes | {quote ? quote.quoteId : ""}
          </Box>
        </Box>

        <Box sx={{ height: "calc(100% - 52px)" }}>
          <Scrollbars universal>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {quote && <Summary quote={quote} />}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Notes quoteId={id} />

                <Files quoteId={quote ? quote.quoteId : ""} />
              </Box>
            </Box>
          </Scrollbars>
        </Box>
      </Box>
    </>
  );
}
