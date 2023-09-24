import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Unstable_Grid2 as Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";

import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props {
  user: UserType;
  states: StateType[];
  onSave: (data: UserType) => void;
  isSending: boolean;
}

export default function Detail({ user, states, onSave, isSending }: Props) {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserType>({
    defaultValues: {
      ...user,
    },
  });

  const onSubmit = (values: any) => {
    onSave(values);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Paper
      sx={{ p: 4, display: "flex", justifyContent: "center" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          direction={{ xs: "column", sm: "row" }}
          mb={1}
        >
          <Grid md={6} xs={12}>
            <Stack spacing={3}>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="First Name"
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Last Name"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    disabled
                    size="small"
                    variant="outlined"
                    label="Email"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="states"
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    readOnly
                    disabled
                    freeSolo
                    size="small"
                    options={states}
                    groupBy={(option) => option?.country}
                    filterSelectedOptions
                    onChange={(_, data) => field.onChange(data)}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="State / Province" />
                    )}
                    ChipProps={{ color: "primary", deleteIcon: <></> }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <Chip
                          {...getTagProps({ index })}
                          color="primary"
                          size="small"
                          label={`${option.country}/${option.name}`}
                        />
                      ))
                    }
                  />
                )}
              />
            </Stack>
          </Grid>

          <Grid md={6} xs={12}>
            <Stack spacing={3}>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    disabled
                    size="small"
                    variant="outlined"
                    label="Role"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="joinedAt"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    disabled
                    size="small"
                    variant="outlined"
                    label="Joined At"
                    {...field}
                    value={
                      field.value
                        ? moment(field.value).format("YYYY-MM-DD h:mm:ss A")
                        : ""
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="lastLogin"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    disabled
                    size="small"
                    variant="outlined"
                    label="Last Login"
                    {...field}
                    value={
                      field.value
                        ? moment(field.value).format("YYYY-MM-DD h:mm:ss A")
                        : ""
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    select
                    disabled
                    size="small"
                    variant="outlined"
                    label="Status"
                    {...field}
                    value={field.value ?? ""}
                    inputProps={{ IconComponent: () => null }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                )}
              />
            </Stack>
          </Grid>

          <Box
            sx={{
              width: "100%",
              px: 2,
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
      </Container>
    </Paper>
  );
}
