import { baseAPI } from ".";
import { LoginNameInputs, SignupNameInputs } from "../types";

export const signupAPI = (payload: SignupNameInputs) => {
  const response = baseAPI.post("user_api/u_reg_user.php", payload);
  return response;
};
export const loginAPI = (payload: LoginNameInputs) => {
  const response = baseAPI.post("user_api/u_login_user.php", payload);
  return response;
};
