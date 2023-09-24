import { Box, Button, Stack, Typography } from "@mui/material";
import Div100vh from "react-div-100vh";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/quote");
  };

  return (
    <Div100vh>
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Typography variant="h1">404</Typography>

        <Typography variant="h3">Page Not Found!</Typography>

        <Typography variant="h5">
          Sorry. We can&apos;t find the page.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate(-2)}
          >
            BACK
          </Button>

          <Button color="primary" variant="contained" onClick={handleBack}>
            HOME
          </Button>
        </Box>
      </Stack>
    </Div100vh>
  );
};

export default Error404;
