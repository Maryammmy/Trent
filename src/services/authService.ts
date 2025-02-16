import { baseAPI } from ".";
import { SignupNameInputs } from "../interfaces/authInterface";

export const signupAPI = (payload: SignupNameInputs) => {
  const response = baseAPI.post("user_api/u_reg_user.php", payload);
  return response;
};
