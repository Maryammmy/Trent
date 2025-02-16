import { IAuth } from "../interfaces/authInterface";

export const loginData: IAuth[] = [
  {
    name: "mobile",
    label: "Phone number",
    placeholder: "+20**********",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "**********",
    type: "password",
  },
];
export const signupData: IAuth[] = [
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
