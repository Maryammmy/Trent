import { ILoginInputs, ISignupInputs } from "../interfaces/authInterface";

export const loginData: ILoginInputs[] = [
  {
    name: "mobile",
    label: "Phone number",
    placeholder: "**********",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "**********",
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
    placeholder: "**********",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "**********",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "**********",
    type: "password",
  },
];
