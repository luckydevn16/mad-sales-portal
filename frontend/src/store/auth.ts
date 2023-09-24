import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  initialized: boolean;
  user: any;
} = {
  initialized: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.initialized = action.payload.initialized;
      state.user = action.payload.user;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
