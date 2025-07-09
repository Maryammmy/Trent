import { Eye, EyeOff } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { IForgetPassword } from "@/interfaces/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { forgetPasswordAPI, verifyOtpAPI } from "@/services/authService";
import { useState } from "react";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import InputErrorMessage from "../ui/InputErrorMessage";
import OtpModal from "./OtpModal";
import { forgetPasswordSchema } from "@/validation/forgetPasswordSchema";
import CountrySelector from "../ui/CountrySelector";
import { useAppDispatch } from "@/store/hooks";
import { setIsloggedin } from "@/store/features/auth/authSlice";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
interface IProps {
  close: () => void;
  isOpen: boolean;
}
function ForgetPasswordModal({ isOpen, close }: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPassword>({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: {
      ccode: "+20",
      mobile: phone,
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit: SubmitHandler<IForgetPassword> = async (data) => {
    setLoading(true);
    setPhone(data.mobile);
    setCountryCode(data.ccode);
    try {
      const response = await forgetPasswordAPI(data);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        close();
        setOtp(true);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  const verifyOtp = async (
    e: React.FormEvent<HTMLFormElement>,
    { otp, mobile, ccode }: { otp: string; mobile: string; ccode: string },
    close: () => void
  ) => {
    e.preventDefault();
    try {
      const response = await verifyOtpAPI({
        mobile,
        ccode,
        otp,
        is_change_password: true,
      });
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        setTimeout(() => {
          close();
          dispatch(setIsloggedin(true));
        }, 500);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  return (
    <>
      <Modal
        maxWidth="550px"
        className="text-2xl text-center p-4 border-b font-semibold"
        title={t("forget_password_title")}
        close={close}
        isOpen={isOpen}
      >
        <div className="p-5 md:py-8 md:px-10">
          <div className="pb-6">
            <p className="text-[#757575] font-medium px-1 text-center md:px-0">
              {t("enter_phone_send_otp")}
              <span className="text-center"> {t("verification_code")}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-medium">{t("phone_number")}</label>
              <div className="flex items-center gap-2 border rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                <Controller
                  name="ccode"
                  control={control}
                  render={({ field }) => (
                    <CountrySelector
                      selectedCountry={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("enter_your_phone_number")}
                      className="w-full outline-none"
                      onChange={(e) => {
                        const value = e.target.value.replace(/^0+/, "");
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
              {errors.mobile && (
                <InputErrorMessage msg={errors.mobile.message} />
              )}
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="password" className="font-medium text-sm">
                {t("new_password")}
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="flex w-full border border-gray-300 rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder={t("enter_your_new_password")}
                      className="w-full outline-none"
                      id="password"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff strokeWidth={2.5} />
                      ) : (
                        <Eye strokeWidth={2.5} />
                      )}
                    </Button>
                  </div>
                )}
              />
              {errors["password"] && (
                <InputErrorMessage msg={errors["password"]?.message} />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirm_password" className="font-medium text-sm">
                {t("confirm_new_password")}
              </label>
              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <div className="flex w-full border border-gray-300 rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder={t("confirm_your_new_password")}
                      className="w-full outline-none"
                      id="confirm_password"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff strokeWidth={2.5} />
                      ) : (
                        <Eye strokeWidth={2.5} />
                      )}
                    </Button>
                  </div>
                )}
              />
            </div>
            {errors["confirm_password"] && (
              <InputErrorMessage msg={errors["confirm_password"]?.message} />
            )}
            <Button
              disabled={loading}
              type="submit"
              className="bg-primary zoom w-full mt-6 py-3 px-3 rounded-lg text-white font-semibold text-sm text-center"
            >
              {loading ? <Loader /> : t("send_otp")}
            </Button>
          </form>
        </div>
      </Modal>
      {otp && (
        <OtpModal
          close={() => setOtp(false)}
          isOpen={otp}
          mobile={phone}
          countryCode={countryCode}
          is_new_user={false}
          verifyOtp={verifyOtp}
        />
      )}
    </>
  );
}

export default ForgetPasswordModal;
