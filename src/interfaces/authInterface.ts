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
}
