import { LoginNameInputs, SignupNameInputs } from "../types";

export interface ILoginInputs {
  name: keyof LoginNameInputs;
  label: string;
  placeholder: string;
  type: string;
}
export interface ISignupInputs {
  name: keyof SignupNameInputs;
  label: string;
  placeholder: string;
  type: string;
}
export interface IVerifyOtp {
  otp: string;
  mobile: string;
  is_change_password: null | boolean;
}
export interface ISendOtp {
  is_new_user?: boolean;
  mobile: string;
}
export interface IForgetPassword {
  mobile: string;
  password: string;
  confirm_password: string;
}
