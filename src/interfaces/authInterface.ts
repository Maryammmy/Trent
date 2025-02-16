export interface IAuth {
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
