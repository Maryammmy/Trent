import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeSearchState {
  isDestinationOpen: boolean;
  isDropdownOpen: boolean;
  isSearchOpen: boolean;
}

const initialState: homeSearchState = {
  isDestinationOpen: false,
  isDropdownOpen: false,
  isSearchOpen: false,
};

const homeSearchSlice = createSlice({
  name: "homeSearch",
  initialState,
  reducers: {
    setIsDestinationOpen(state, action: PayloadAction<boolean>) {
      state.isDestinationOpen = action.payload;
    },
    setIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
    setIsSearchOpen(state, action: PayloadAction<boolean>) {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { setIsDestinationOpen, setIsDropdownOpen, setIsSearchOpen } =
  homeSearchSlice.actions;

export default homeSearchSlice.reducer;
