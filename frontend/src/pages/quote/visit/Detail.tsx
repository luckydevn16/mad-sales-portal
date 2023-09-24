import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";

import {
  apiGetQuoteVisit,
  apiInitializeQuoteVisit,
  apiUpdateQuoteVisit,
} from "utils/api";
import { SITE_TITLE } from "utils/config";
import EmoticonRating from "components/shared/EmoticonRating";
import { PlacesAutocomplete } from "components";
import { getRichAddress } from "components/shared/PlacesAutocomplete/utils";

export default function QuoteVisitCreate() {
  const { id = "" } = useParams();
  const [visit, setVisit] = useState<VisitType>();

  const [salesPersons, setSalesPersons] = useState<any[]>([]);
  const [customerNames, setCustomerNames] = useState<any[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    setIsSending(true);

    const richLocation = await getRichAddress(values.location);

    await apiUpdateQuoteVisit({
      id,
      ...values,
      city: richLocation.city,
      stateName: richLocation.stateLn,
      stateCode: richLocation.state,
      zipCode: richLocation.zipcode,
      streetAddress: richLocation.address,
      country: richLocation.country,
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(res.data?.message, { variant: "success" });
          navigate("/quote", { replace: true });
        } else if (res.status === 400) {
          enqueueSnackbar(res.data?.message, { variant: "warning" });
        } else {
          enqueueSnackbar(res.data?.message, { variant: "error" });
        }
        setIsSending(false);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again later.", {
          variant: "error",
        });
        setIsSending(false);
      });
  };

  useEffect(() => {
    const initialize = async () => {
      await apiInitializeQuoteVisit().then(async (res) => {
        setSalesPersons(res.data.distinctSalesPerson);
        setCustomerNames(res.data.distinctCustomerNames);

        if (id) {
          await apiGetQuoteVisit({ id }).then((response) => {
            setVisit(response.data.visit);
            reset(response.data.visit);
          });
        }
      });
    };

    initialize();
  }, []);

  const handleBack = () => {
    navigate("/quote");
  };

  return (
    <>
      <Helmet>
        <title>
          {SITE_TITLE} | Quotes | Visit | {visit ? visit.quoteId : ""}
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
            Quotes | Visit | {visit ? visit.quoteId : ""}
          </Box>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ height: "calc(100% - 52px)" }}
        >
          <Scrollbars universal>
            <Paper sx={{ p: 2 }}>
              <Grid
                container
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
              >
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
                        label="ID"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={6}>
                  <Controller
                    control={control}
                    name="salesPerson"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        select
                        size="small"
                        variant="outlined"
                        label="Sales Person"
                        {...field}
                        value={field.value ?? ""}
                      >
                        {salesPersons?.map((sp: any) => (
                          <MenuItem key={sp.salesPerson} value={sp.salesPerson}>
                            {sp.salesPerson}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item sm={3}>
                  <Controller
                    control={control}
                    name="creationDate"
                    defaultValue={dayjs()}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          slotProps={{
                            textField: {
                              size: "small",
                              variant: "outlined",
                            },
                            field: {
                              shouldRespectLeadingZeros: true,
                            },
                          }}
                          label="Date"
                          {...field}
                          value={dayjs(field.value)}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Controller
                    control={control}
                    name="customerName"
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        disablePortal
                        size="small"
                        options={customerNames}
                        getOptionLabel={(option) =>
                          option.customerName ?? option
                        }
                        isOptionEqualToValue={(option, value) => {
                          return option.customerName === value;
                        }}
                        renderInput={(params) => (
                          <TextField
                            label="Customer"
                            variant="outlined"
                            {...params}
                          />
                        )}
                        {...field}
                        value={field.value ?? null}
                        onChange={(event, value) => {
                          field.onChange(value?.customerName ?? "");
                        }}
                        onInputChange={(event, value, reason) => {
                          if (reason === "input" && value) {
                            field.onChange(value);
                          }
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Controller
                    control={control}
                    name="attendees"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Attendees"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={6}>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <PlacesAutocomplete size="small" {...field} />
                    )}
                  />
                </Grid>

                <Grid item sm={6} alignSelf="center" justifySelf="center">
                  <Controller
                    control={control}
                    name="reception"
                    defaultValue={4}
                    render={({ field }) => <EmoticonRating {...field} />}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Controller
                    control={control}
                    name="summaryOfMeeting"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        multiline
                        rows={4}
                        label="Summary of Meeting"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={6}>
                  <Controller
                    control={control}
                    name="doingRight"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        multiline
                        rows={3}
                        label="What we are doing right"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={6}>
                  <Controller
                    control={control}
                    name="areasToImprove"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        multiline
                        rows={3}
                        label="Areas to Improve"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Controller
                    control={control}
                    name="actionNextSteps"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        multiline
                        rows={4}
                        label="Actions/Next Steps"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleBack}
                    >
                      Back
                    </Button>

                    <LoadingButton
                      loading={isSubmitting || isSending}
                      type="submit"
                      variant="contained"
                    >
                      Save
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Scrollbars>
        </Box>
      </Box>
    </>
  );
}
