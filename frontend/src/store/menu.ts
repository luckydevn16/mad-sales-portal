import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  openItem: ["quote"],
  defaultId: "quote",
  openComponent: "buttons",
  drawerOpen: false,
  componentDrawerOpen: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },
  },
});

export default menuSlice.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } =
  menuSlice.actions;
