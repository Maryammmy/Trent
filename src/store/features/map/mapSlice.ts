import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  enableMap: boolean;
}

const initialState: MapState = {
  enableMap: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setEnableMap(state, action: PayloadAction<boolean>) {
      state.enableMap = action.payload;
    },
  },
});

export const { setEnableMap } = mapSlice.actions;
export default mapSlice.reducer;
