import { Controller, useForm } from "react-hook-form";
import Div100vh from "react-div-100vh";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  onVerify: Function;
  onResend: Function;
  onBack: Function;
  isSending: boolean;
}

const VerificationForm: React.FC<Props> = ({
  onVerify,
  onResend,
  onBack,
  isSending,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { code: "" } });

  const onSubmit = (values: any) => {
    onVerify(values.code);
  };

  const handleResend = () => {
    onResend();
  };

  return (
    <Div100vh>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Avatar
          alt="Mad Logo"
          src="./images/mad-logo.png"
          sx={{ width: 120, height: 120, borderRadius: 0 }}
        />

        <Card
          sx={{
            width: "400px",
            border: "none",
            borderRadius: 2,
            borderColor: "#e6ebf1",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            m: 3,
            p: 4,
          }}
        >
          <CardHeader
            title={
              <Box
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#262626",
                }}
              >
                Check your email for verification
              </Box>
            }
          />

          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack direction="row">
              <Controller
                control={control}
                name="code"
                rules={{
                  required: "This field is required.",
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    error={!!errors?.code}
                    label="Enter code"
                    {...field}
                  />
                )}
              />

              <Button
                variant="outlined"
                onClick={() => handleResend()}
                sx={{ ml: 1, whiteSpace: "nowrap" }}
              >
                Re-Send
              </Button>
            </Stack>

            {errors?.code?.message && (
              <Typography color="primary" fontSize={12} mx={1.5} mt={0.5}>
                {errors?.code?.message}
              </Typography>
            )}

            <Stack spacing={1}>
              <LoadingButton
                loading={isSubmitting || isSending}
                fullWidth
                disableElevation
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 4 }}
              >
                Verify
              </LoadingButton>

              <Button fullWidth variant="text" onClick={() => onBack()}>
                Back
              </Button>
            </Stack>
          </Box>
        </Card>
      </Stack>
    </Div100vh>
  );
};

export default VerificationForm;
