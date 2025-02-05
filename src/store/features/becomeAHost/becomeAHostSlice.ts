import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface becomeAHostState {
  isFinishUpModal: boolean;
}
const initialState: becomeAHostState = {
  isFinishUpModal: false,
};
const becomeAHostSlice = createSlice({
  name: "becomeAHost",
  initialState,
  reducers: {
    setIsFinishUpModal(state, action: PayloadAction<boolean>) {
      state.isFinishUpModal = action.payload;
    },
  },
});

export const { setIsFinishUpModal } = becomeAHostSlice.actions;

export default becomeAHostSlice.reducer;
