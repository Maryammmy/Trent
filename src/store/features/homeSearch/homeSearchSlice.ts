import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeSearchState {
  isDestinationOpen: boolean;
  isLangSwitcherOpen: boolean;
  isDropdownOpen: boolean;
  isLoggedIn: boolean;
}

const initialState: homeSearchState = {
  isDestinationOpen: false,
  isLangSwitcherOpen: false,
  isDropdownOpen: false,
  isLoggedIn: false,
};

const homeSearchSlice = createSlice({
  name: "homeSearch",
  initialState,
  reducers: {
    setIsDestinationOpen(state, action: PayloadAction<boolean>) {
      state.isDestinationOpen = action.payload;
    },
    setIsLangSwitcherOpen(state, action: PayloadAction<boolean>) {
      state.isLangSwitcherOpen = action.payload;
    },
    setIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setIsDestinationOpen,
  setIsLangSwitcherOpen,
  setIsDropdownOpen,
  setIsLoggedIn,
} = homeSearchSlice.actions;

export default homeSearchSlice.reducer;
