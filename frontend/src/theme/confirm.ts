const defaultConfirm = {
  title: "Are You Sure?",
  description: "",
  content: null,
  confirmationText: "Yes",
  cancellationText: "No",
  dialogProps: {
    fullWidth: false,
  },
  dialogActionsProps: {},
  confirmationButtonProps: {
    variant: "contained" as const,
  },
  cancellationButtonProps: {
    variant: "outlined" as const,
  },
  titleProps: {},
  contentProps: {},
  allowClose: true,
  confirmationKeyword: undefined,
  confirmationKeywordTextFieldProps: {},
  hideCancelButton: false,
  buttonOrder: ["cancel", "confirm"],
};

export default defaultConfirm;
