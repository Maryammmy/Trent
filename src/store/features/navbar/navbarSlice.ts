import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface navbarState {
  bg: boolean;
}

const initialState: navbarState = {
  bg: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setBg(state, action: PayloadAction<boolean>) {
      state.bg = action.payload;
    },
  },
});

export const { setBg } = navbarSlice.actions;

export default navbarSlice.reducer;
