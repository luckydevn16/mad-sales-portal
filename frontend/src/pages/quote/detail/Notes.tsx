import React, { useEffect, useState } from "react";

import { Box, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

import { apiGetAllQuoteNotes, apiCreateQuoteNote } from "utils/api";

interface Props {
  quoteId: string;
}

export default function Notes({ quoteId }: Props) {
  const [notes, setNotes] = useState<QuoteNoteType[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    setIsSending(true);
    await apiCreateQuoteNote({
      quoteId,
      content: values.content,
    })
      .then((res) => {
        if (res.status === 200) {
          reset();
          setNotes(res.data.notes);
          enqueueSnackbar(res.data?.message, { variant: "success" });
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
    const getAllQuoteNotes = async () => {
      if (quoteId) {
        const res = await apiGetAllQuoteNotes({ quoteId });
        setNotes(res.data.notes);
      }
    };

    getAllQuoteNotes();
  }, [quoteId, reset]);

  return (
    <Paper sx={{ flex: "1 1 0px", p: 2 }}>
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
        Notes
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: 2,
          alignItems: "start",
        }}
      >
        <Controller
          control={control}
          name="content"
          rules={{
            required: "This field is required.",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              focused
              multiline
              size="small"
              variant="outlined"
              label="Enter a new note"
              {...field}
              value={field.value ?? ""}
              error={!!error}
              helperText={error?.message ?? ""}
            />
          )}
        />

        <LoadingButton
          fullWidth
          loading={isSubmitting || isSending}
          type="submit"
          variant="contained"
        >
          Add
        </LoadingButton>

        {notes.length > 0 &&
          notes.map((note) => (
            <React.Fragment key={note.id}>
              <TextField
                fullWidth
                multiline
                disabled
                size="small"
                variant="outlined"
                label=""
                value={note.content ?? ""}
              />

              <Box sx={{ lineHeight: "40px", textAlign: "left" }}>
                {moment(note.createdAt).format("DD/MM/YYYY h:m A")}
              </Box>
            </React.Fragment>
          ))}
      </Box>
      {notes.length <= 0 && (
        <Typography
          sx={{
            mt: 2,
            width: "100%",
            color: "rgba(0, 0, 0, 0.6)",
            fontStyle: "italic",
            textAlign: "center",
            fontSize: 14,
            borderTop: "1px solid rgba(224, 224, 224, 1)",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            p: 2,
          }}
        >
          No records to display
        </Typography>
      )}
    </Paper>
  );
}
