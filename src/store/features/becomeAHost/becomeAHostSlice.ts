import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface becomeAHostState {
  isFinishUpModal: boolean;
  completedSteps: string[];
  createdProperty: {
    id: number | "";
    title: {
      en: string;
      ar: string;
    };
  };
}
const initialState: becomeAHostState = {
  isFinishUpModal: false,
  completedSteps: [],
  createdProperty: { id: "", title: { en: "", ar: "" } },
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
    setCreatedProperty(
      state,
      action: PayloadAction<{ id: number; title: { en: string; ar: string } }>
    ) {
      state.createdProperty = action.payload;
    },
    resetSteps(state) {
      state.completedSteps = [];
    },
  },
});

export const {
  setIsFinishUpModal,
  addCompletedStep,
  resetSteps,
  setCreatedProperty,
} = becomeAHostSlice.actions;

export default becomeAHostSlice.reducer;
