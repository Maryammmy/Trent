import { SignupNameInputs } from "../types";

export interface ISignupInputs {
  name: keyof SignupNameInputs;
  label: string;
  placeholder: string;
  type: string;
}
export interface IVerifyOtp {
  otp: string;
  mobile: string;
  ccode: string;
  is_change_password: null | boolean;
}
export interface ISendOtp {
  is_new_user?: boolean;
  mobile: string;
  ccode: string;
}
export interface IForgetPassword {
  mobile: string;
  password: string;
  confirm_password: string;
  ccode: string;
}
