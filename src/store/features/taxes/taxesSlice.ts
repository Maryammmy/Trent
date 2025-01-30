import { createSlice } from "@reduxjs/toolkit";

interface TaxesState {
  enableTaxes: boolean;
}

const initialState: TaxesState = {
  enableTaxes: false,
};

const taxesSlice = createSlice({
  name: "taxes",
  initialState,
  reducers: {
    setEnableTaxes(state) {
      state.enableTaxes = !state.enableTaxes;
    },
  },
});

export const { setEnableTaxes } = taxesSlice.actions;
export default taxesSlice.reducer;
