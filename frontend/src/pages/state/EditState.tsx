import { useState } from "react";

import { Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { COUNTRIES } from "utils/config";
import { apiUpdateState } from "utils/api";

interface Props {
  salesPersons: UserType[];
  row: Record<string, any>;
  onCreated: Function;
}

export default function EditState({ salesPersons, row, onCreated }: Props) {
  const navigate = useNavigate();

  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StateType>({
    defaultValues: {
      id: row.id,
      code: row.code,
      name: row.name,
      country: row.country,
      users: row.users,
    },
  });

  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values: any) => {
    setIsSending(true);
    await apiUpdateState({
      id: values.id,
      code: values.code,
      name: values.name,
      country: values.country,
      users: values.users,
    })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          onCreated();
          enqueueSnackbar(res.data?.message, { variant: "success" });
        } else if (res.status === 400) {
          enqueueSnackbar(res.data.message, { variant: "warning" });
        } else if (res.status === 403) {
          navigate("/403");
          enqueueSnackbar(res.data?.message, { variant: "warning" });
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
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

  return (
    <>
      <Tooltip arrow placement="right" title="Edit">
        <IconButton color="primary" onClick={handleUpdate}>
          <Edit />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        disableRestoreFocus
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box sx={{ fontSize: "1.25rem" }}>Update State</Box>

          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <TextField
                  label="Code"
                  fullWidth
                  autoFocus
                  size="small"
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField label="Name" fullWidth size="small" {...field} />
              )}
            />

            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <TextField
                  select
                  label="Country"
                  fullWidth
                  size="small"
                  {...field}
                >
                  {COUNTRIES.map((country: string) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              control={control}
              name="users"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  size="small"
                  options={salesPersons}
                  getOptionLabel={(option) =>
                    `${option?.firstName} ${option?.lastName}`
                  }
                  filterSelectedOptions
                  onChange={(_, data) => field.onChange(data)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Sales Person" />
                  )}
                  ChipProps={{ color: "primary" }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <Chip
                        {...getTagProps({ index })}
                        color="primary"
                        size="small"
                        label={`${option.firstName} ${option.lastName}`}
                      />
                    ))
                  }
                />
              )}
            />
          </Box>

          <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton
              loading={isSubmitting || isSending}
              type="submit"
              variant="contained"
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
