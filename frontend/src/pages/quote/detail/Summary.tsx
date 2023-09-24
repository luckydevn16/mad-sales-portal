import { useState } from "react";

import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiUpdateQuote } from "utils/api";
import { QUOTE_PROBABILITY, QUOTE_STATUS } from "utils/config";

export default function Summary({ quote }: { quote: QuoteType }) {
  const navigate = useNavigate();

  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: quote });

  const handleUpdate = async (values: any) => {
    setIsSending(true);
    await apiUpdateQuote({
      id: values.id,
      status: values.status,
      probability: values.probability,
      estAwardDate: values.estAwardDate,
      nextFollowUp: values.nextFollowUp,
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(res.data.message, { variant: "success" });
        } else if (res.status === 400) {
          enqueueSnackbar(res.data?.message, { variant: "warning" });
        } else {
          enqueueSnackbar(res.data?.message, { variant: "error" });
        }
        setIsSending(false);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again later", {
          variant: "error",
        });
        setIsSending(false);
      });
  };

  const handleBack = () => {
    navigate("/quote");
  };

  return (
    <Paper sx={{ p: 2 }} component="form" onSubmit={handleSubmit(handleUpdate)}>
      <Box
        sx={{
          pb: 0.5,
          mb: 2,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "primary.main",
          color: "primary.main",
          fontWeight: 700,
        }}
      >
        Summary
      </Box>

      <Grid container spacing={2} direction={{ xs: "column", sm: "row" }}>
        <Grid item sm={3}>
          <Controller
            control={control}
            name="quoteId"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Quote ID"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={9}>
          <Controller
            control={control}
            name="projectName"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Project Name"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={3}>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <TextField
                fullWidth
                focused
                select
                size="small"
                variant="outlined"
                label="Status"
                {...field}
                value={field.value ?? ""}
              >
                {QUOTE_STATUS.map((status: string) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item sm={3}>
          <Controller
            control={control}
            name="probability"
            render={({ field }) => (
              <TextField
                fullWidth
                focused
                select
                size="small"
                variant="outlined"
                label="Probability"
                {...field}
                value={field.value ?? ""}
              >
                {QUOTE_PROBABILITY.map((status: string) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item sm={3}>
          <Controller
            control={control}
            name="units"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Units"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={3}>
          <Controller
            control={control}
            name="value"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Value"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={9}>
          <Controller
            control={control}
            name="customerName"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Customer"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={3}>
          <Controller
            control={control}
            name="contact"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Contact"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={3}>
          <Controller
            control={control}
            name="salesPerson"
            render={({ field }) => (
              <TextField
                multiline
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Sales Person"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={3}>
          <Controller
            control={control}
            name="quoteBy"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Quote By"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={2}>
          <Controller
            control={control}
            name="creationDate"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Quote Date"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={2}>
          <Controller
            control={control}
            name="revision"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Rev"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={2}>
          <Controller
            control={control}
            name="revisionDate"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      variant: "outlined",
                    },
                    field: {
                      shouldRespectLeadingZeros: true,
                    },
                  }}
                  label="Rev Date"
                  {...field}
                  value={dayjs(field.value)}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>

        <Grid item sm={6}>
          <Controller
            control={control}
            name="endContractor"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="End Contractor"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={6}>
          <Controller
            control={control}
            name="consultant"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Consultant"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={12}>
          <Controller
            control={control}
            name="projectAddress"
            render={({ field }) => (
              <TextField
                fullWidth
                disabled
                size="small"
                variant="outlined"
                label="Project Address"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item sm={4}>
          <Controller
            control={control}
            name="sysAwardDate"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      variant: "outlined",
                    },
                    field: {
                      shouldRespectLeadingZeros: true,
                    },
                  }}
                  label="Sys Award Date"
                  {...field}
                  value={dayjs(field.value)}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>

        <Grid item sm={4}>
          <Controller
            control={control}
            name="estAwardDate"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      variant: "outlined",
                    },
                    field: {
                      shouldRespectLeadingZeros: true,
                    },
                  }}
                  label="Est Award Date"
                  {...field}
                  value={dayjs(field.value)}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>

        <Grid item sm={4}>
          <Controller
            control={control}
            name="nextFollowUp"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      variant: "outlined",
                    },
                    field: {
                      shouldRespectLeadingZeros: true,
                    },
                  }}
                  label="Next Follow Up"
                  {...field}
                  value={dayjs(field.value)}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>

        <Box
          sx={{
            width: "100%",
            pt: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button variant="outlined" size="large" onClick={handleBack}>
            Back
          </Button>

          <LoadingButton
            loading={isSubmitting || isSending}
            disableElevation
            type="submit"
            variant="contained"
            size="large"
          >
            Save
          </LoadingButton>
        </Box>
      </Grid>
    </Paper>
  );
}
