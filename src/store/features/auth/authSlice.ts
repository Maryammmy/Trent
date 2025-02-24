import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  isLoggedin: boolean;
  isSignup: boolean;
  isForgetPassword: boolean;
}

const initialState: authState = {
  isLoggedin: false,
  isSignup: false,
  isForgetPassword: false,
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
    setIsForgetPassword(state, action: PayloadAction<boolean>) {
      state.isForgetPassword = action.payload;
    },
  },
});

export const { setIsloggedin, setIsSignup, setIsForgetPassword } =
  authSlice.actions;

export default authSlice.reducer;
