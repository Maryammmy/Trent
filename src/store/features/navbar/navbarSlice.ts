import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface navbarState {
  bg: boolean;
  toggle: boolean;
}

const initialState: navbarState = {
  bg: false,
  toggle: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setBg(state, action: PayloadAction<boolean>) {
      state.bg = action.payload;
    },
    setToggle(state, action: PayloadAction<boolean>) {
      state.toggle = action.payload;
    },
  },
});

export const { setBg, setToggle } = navbarSlice.actions;

export default navbarSlice.reducer;
