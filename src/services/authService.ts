import { IForgetPassword, ISendOtp, IVerifyOtp } from "@/interfaces/auth";
import { baseAPI } from ".";
import { LoginNameInputs, SignupNameInputs } from "../types";

export const verifySignupAPI = async (payload: SignupNameInputs) => {
  const response = await baseAPI.post("user_api/u_verify_signup.php", payload);
  return response;
};
export const verifyOtpAPI = async (payload: IVerifyOtp) => {
  const response = await baseAPI.post("user_api/verify_otp.php", payload);
  return response;
};
export const loginAPI = async (payload: LoginNameInputs) => {
  const response = await baseAPI.post("user_api/u_login_user.php", payload);
  return response;
};
export const sendOtpAPI = async ({
  is_new_user = true,
  mobile,
  ccode,
}: ISendOtp) => {
  const response = await baseAPI.post("user_api/send_otp.php", {
    is_new_user,
    mobile,
    ccode,
  });
  return response;
};
export const forgetPasswordAPI = async (payload: IForgetPassword) => {
  const response = await baseAPI.post(
    "user_api/u_forget_password.php",
    payload
  );
  return response;
};
