import { useState } from "react";

import { Box, Button, Dialog, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { apiSendInvite } from "utils/api";
import roles from "utils/roles";

interface Props {
  onInvited: Function;
}

export default function Invite({ onInvited }: Props) {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: roles.admin,
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values: any) => {
    setIsSending(true);
    await apiSendInvite({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
    })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          reset();
          onInvited();
          enqueueSnackbar(res.data.message, { variant: "success" });
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
        enqueueSnackbar("Something went wrong. Please try again later", {
          variant: "error",
        });
        setIsSending(false);
      });
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Invite
      </Button>

      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={() => handleClose()}
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
          <Box sx={{ fontSize: "1.25rem" }}>Invite user</Box>

          <Box sx={{ fontSize: "1rem" }}>
            Invited members can directly join to this portal using the invited
            link address without any authentication required.
          </Box>

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
              name="email"
              render={({ field }) => (
                <TextField label="Email" fullWidth autoFocus {...field} />
              )}
            />

            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField label="First name" fullWidth {...field} />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField label="Last name" fullWidth {...field} />
              )}
            />

            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <TextField select label="Role" fullWidth {...field}>
                  {[roles.admin, roles.mad, roles.ecr].map((role: string) => (
                    <MenuItem key={role} value={role}>
                      {role}
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
              Send
            </LoadingButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
