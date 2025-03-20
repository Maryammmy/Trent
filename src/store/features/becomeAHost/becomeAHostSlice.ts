import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface becomeAHostState {
  isFinishUpModal: boolean;
  completedSteps: string[];
}
const initialState: becomeAHostState = {
  isFinishUpModal: false,
  completedSteps: [],
};
const becomeAHostSlice = createSlice({
  name: "becomeAHost",
  initialState,
  reducers: {
    setIsFinishUpModal(state, action: PayloadAction<boolean>) {
      state.isFinishUpModal = action.payload;
    },
    addCompletedStep(state, action: PayloadAction<string | undefined>) {
      const step = action.payload;
      if (step && !state.completedSteps.includes(step)) {
        state.completedSteps.push(step);
      }
    },
    resetSteps(state) {
      state.completedSteps = [];
    },
  },
});

export const { setIsFinishUpModal, addCompletedStep, resetSteps } =
  becomeAHostSlice.actions;

export default becomeAHostSlice.reducer;
