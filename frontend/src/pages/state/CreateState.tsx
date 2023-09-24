import { useState } from "react";

import { Box, Button, Dialog, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { COUNTRIES } from "utils/config";
import { apiCreateState } from "utils/api";

interface Props {
  onCreated: Function;
}

export default function CreateState({ onCreated }: Props) {
  const navigate = useNavigate();

  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      code: "",
      name: "",
      country: COUNTRIES[0],
    },
  });

  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values: any) => {
    setIsSending(true);
    await apiCreateState({
      code: values.code,
      name: values.name,
      country: values.country,
    })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          reset();
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
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        Create
      </Button>

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
          <Box sx={{ fontSize: "1.25rem" }}>Create State</Box>

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
                <TextField label="Code" fullWidth autoFocus {...field} />
              )}
            />

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField label="Name" fullWidth {...field} />
              )}
            />

            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <TextField select label="Country" fullWidth {...field}>
                  {COUNTRIES.map((country: string) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
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
