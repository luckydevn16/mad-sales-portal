import Div100vh from "react-div-100vh";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Box, Card, CardHeader, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
interface Props {
  onLogin: Function;
  isSending: boolean;
}

const LoginForm: React.FC<Props> = ({ onLogin, isSending }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "" } });

  const onSubmit = (values: any) => {
    onLogin(values.email);
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
            pb: 6,
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
                Log in to Mad Sales Portal
              </Box>
            }
          />

          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: "This field is required.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
                  message: "Please enter a valid email.",
                },
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Enter email"
                  error={!!errors?.email}
                  helperText={errors?.email?.message ?? ""}
                  {...field}
                />
              )}
            />

            <LoadingButton
              loading={isSubmitting || isSending}
              disableElevation
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 4 }}
            >
              Login
            </LoadingButton>
          </Box>
        </Card>
      </Stack>
    </Div100vh>
  );
};

export default LoginForm;
