import { IAuth } from "../interfaces/authInterface";

export const loginData: IAuth[] = [
  {
    name: "phoneNumber",
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
    name: "firstName",
    label: "First name",
    placeholder: "Enter your first name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Enter your last name",
    type: "text",
  },
  {
    name: "phoneNumber",
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
  {
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "**********",
    type: "password",
  },
];
