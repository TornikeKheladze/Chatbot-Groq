import { createSlice } from "@reduxjs/toolkit";
import { darkTheme, lightTheme } from "../theme/theme";

const initialState = {
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme.mode === "light" ? darkTheme : lightTheme;
    },
    resetTheme: () => initialState,
  },
});

export const { toggleTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
