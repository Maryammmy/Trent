import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeSearchState {
  isDestinationOpen: boolean;
  isLangSwitcherOpen: boolean;
  isDropdownOpen: boolean;
}

const initialState: homeSearchState = {
  isDestinationOpen: false,
  isLangSwitcherOpen: false,
  isDropdownOpen: false,
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
  },
});

export const {
  setIsDestinationOpen,
  setIsLangSwitcherOpen,
  setIsDropdownOpen,
} = homeSearchSlice.actions;

export default homeSearchSlice.reducer;
