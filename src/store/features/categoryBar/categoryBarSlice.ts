import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface categoryBarState {
  shadow: boolean;
}

const initialState: categoryBarState = {
  shadow: false,
};

const categoryBarSlice = createSlice({
  name: "categoryBar",
  initialState,
  reducers: {
    setShadow(state, action: PayloadAction<boolean>) {
      state.shadow = action.payload;
    },
  },
});

export const { setShadow } = categoryBarSlice.actions;

export default categoryBarSlice.reducer;
