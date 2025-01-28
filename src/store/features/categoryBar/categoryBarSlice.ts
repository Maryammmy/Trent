import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface categoryBarState {
  shadow: boolean;
  isDropdownOpen: boolean;
  isLoggedIn: boolean;
}

const initialState: categoryBarState = {
  shadow: false,
  isDropdownOpen: false,
  isLoggedIn: false,
};

const categoryBarSlice = createSlice({
  name: "categoryBar",
  initialState,
  reducers: {
    setShadow(state, action: PayloadAction<boolean>) {
      state.shadow = action.payload;
    },
    setIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setShadow, setIsDropdownOpen, setIsLoggedIn } =
  categoryBarSlice.actions;

export default categoryBarSlice.reducer;
