import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light" };

const themeSlice = createSlice({
  name: "Theme",
  initialState: initialState,
  reducers: {
    dark(state) {
      state.theme = "dark";
    },
    light(state) {
      state.theme = "light";
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;