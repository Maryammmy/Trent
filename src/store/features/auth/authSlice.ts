import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  isLoggedin: boolean;
  isSignup: boolean;
}

const initialState: authState = {
  isLoggedin: false,
  isSignup: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsloggedin(state, action: PayloadAction<boolean>) {
      state.isLoggedin = action.payload;
    },
    setIsSignup(state, action: PayloadAction<boolean>) {
      state.isSignup = action.payload;
    },
  },
});

export const { setIsloggedin, setIsSignup } = authSlice.actions;

export default authSlice.reducer;
