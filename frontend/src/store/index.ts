import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import menuReducer from "./menu";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
