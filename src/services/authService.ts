import { baseAPI } from ".";
import { LoginNameInputs, SignupNameInputs } from "../types";

export const verifysignupAPI = (payload: SignupNameInputs) => {
  const response = baseAPI.post("user_api/u_verify_signup.php", payload);
  return response;
};
export const loginAPI = (payload: LoginNameInputs) => {
  const response = baseAPI.post("user_api/u_login_user.php", payload);
  return response;
};
