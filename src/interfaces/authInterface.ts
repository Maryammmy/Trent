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
export type SignupNameInputs = {
  name: string;
  email: string;
  mobile: string;
  ccode: string;
  password: string;
  confirmPassword: string;
};
export type LoginNameInputs = {
  mobile: string;
  ccode: string;
  password: string;
};
