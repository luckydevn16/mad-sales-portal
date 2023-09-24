import apiClient from "./apiClient";

// auth
export const apiCheckAuth = () => apiClient().get("/auth/check");

export const apiLogin = (body: any) => apiClient().post("/auth/login", body);
export const apiLogout = () => apiClient().get("/auth/logout");

export const apiVerifyCode = (body: any) =>
  apiClient().post("/auth/verify-code", body);

export const apiResendCode = (body: any) =>
  apiClient().post("/auth/resend-code", body);

export const apiAcceptInvitation = (body: any) =>
  apiClient().post("/auth/accept-invitation", body);

export const apiSaveProfile = (body: any) =>
  apiClient().post("/auth/profile", body);

// quote
export const apiGetQuote = (body: any) => apiClient().post("/quote/get", body);

export const apiUpdateQuote = (body: any) =>
  apiClient().post("/quote/update", body);

export const apiGetAllQuotes = (body: any) =>
  apiClient().post("/quote/all", body);

export const apiGetAllQuoteNotes = (body: any) =>
  apiClient().post("/quote/note/all", body);

export const apiCreateQuoteNote = (body: any) =>
  apiClient().post("/quote/note/create", body);

export const apiGetAllQuoteFiles = (body: any) =>
  apiClient().post("/quote/file/all", body);

export const apiUploadQuoteFiles = (body: any) =>
  apiClient().post("/quote/file/upload", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const apiDownloadQuoteFile = (body: any) =>
  apiClient().post("/quote/file/download", body, { responseType: "blob" });

export const apiInitializeQuoteVisit = () =>
  apiClient().post("/quote/visit/initialize");

export const apiCreateQuoteVisit = (body: any) =>
  apiClient().post("/quote/visit/create", body);

export const apiGetQuoteVisit = (body: any) =>
  apiClient().post("/quote/visit/get", body);

export const apiUpdateQuoteVisit = (body: any) =>
  apiClient().post("/quote/visit/update", body);

// user
export const apiGetUsers = (body: any) => apiClient().post("/user/get", body);

export const apiGetSalesPersons = () => apiClient().get("/user/sales-persons");

export const apiGetUser = (body: any) => apiClient().post("/user/detail", body);

export const apiUpdateUser = (body: any) =>
  apiClient().post("/user/update", body);

export const apiUpdateUserStatus = (body: any) =>
  apiClient().post("/user/update-status", body);

export const apiDeleteUser = (body: any) =>
  apiClient().post("/user/delete", body);

// invitation
export const apiSendInvite = (body: any) =>
  apiClient().post("/invitation/send", body);

export const apiGetInvitations = (body: any) =>
  apiClient().post("/invitation/get", body);

export const apiDeleteInvitation = (body: any) =>
  apiClient().post("/invitation/delete", body);

// state
export const apiGetAllStates = () => apiClient().get("/state/all");

export const apiGetStates = (body: any) => apiClient().post("/state/get", body);

export const apiCreateState = (body: any) =>
  apiClient().post("/state/create", body);

export const apiUpdateState = (body: any) =>
  apiClient().post("/state/update", body);

export const apiDeleteState = (body: any) =>
  apiClient().post("/state/delete", body);
