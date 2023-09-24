import { Alert, Box, CircularProgress } from "@mui/material";

interface CircularLoadingProps {
  loading?: boolean;
  msg?: string;
  severity?: "success" | "info" | "warning" | "error";
}

export default function CircularLoading(props: CircularLoadingProps) {
  const { loading = true, msg = null, severity = "error" } = props;

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        backgroundColor: "#0004",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        py: 5,
      }}
    >
      {loading && <CircularProgress size={48} sx={{ color: "primary.main" }} />}

      {!!msg && (
        <Alert
          variant="outlined"
          severity={severity}
          sx={{ backgroundColor: "common.white" }}
        >
          {msg}
        </Alert>
      )}
    </Box>
  );
}
