import { ISendOtp, IVerifyOtp } from "@/interfaces/authInterface";
import { baseAPI } from ".";
import { LoginNameInputs, SignupNameInputs } from "../types";

export const verifySignupAPI = (payload: SignupNameInputs) => {
  const response = baseAPI.post("user_api/u_verify_signup.php", payload);
  return response;
};
export const verifyOtpAPI = (payload: IVerifyOtp) => {
  const response = baseAPI.post("user_api/verify_otp.php", payload);
  return response;
};
export const loginAPI = (payload: LoginNameInputs) => {
  const response = baseAPI.post("user_api/u_login_user.php", payload);
  return response;
};
export const sendOtpApi = ({ is_new_user = true, mobile }: ISendOtp) => {
  const response = baseAPI.post("user_api/send_otp.php", {
    is_new_user,
    mobile,
  });
  return response;
};
