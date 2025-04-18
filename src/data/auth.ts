import { ILoginInputs, ISignupInputs } from "../interfaces/auth";

export const loginData: ILoginInputs[] = [
  {
    name: "mobile",
    label: "Phone number",
    placeholder: "Enter your phone number",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
];
export const signupData: ISignupInputs[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "text",
  },
  {
    name: "mobile",
    label: "Phone number",
    placeholder: "Enter your phone number",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "Confirm your password",
    type: "password",
  },
];
