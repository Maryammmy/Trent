import { ISignupInputs } from "../interfaces/auth";

export const signupData: ISignupInputs[] = [
  {
    name: "name",
    label: "name",
    placeholder: "enter_name",
    type: "text",
  },
  {
    name: "email",
    label: "email",
    placeholder: "enter_email",
    type: "text",
  },
  {
    name: "mobile",
    label: "phone_number",
    placeholder: "enter_phone_number",
    type: "text",
  },
  {
    name: "password",
    label: "password",
    placeholder: "enter_password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "confirm_password",
    placeholder: "confirm_your_password",
    type: "password",
  },
];
