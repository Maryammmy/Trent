import { Eye, EyeOff, X } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { IForgetPassword } from "@/interfaces/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiError } from "@/interfaces";
import toast from "react-hot-toast";
import { forgetPasswordAPI, verifyOtpAPI } from "@/services/authService";
import { useState } from "react";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import InputErrorMessage from "../ui/InputErrorMessage";
import OtpModal from "./OtpModal";
import { forgetPasswordSchema } from "@/validation/forgetPasswordSchema";
import CountrySelector from "../ui/CountrySelector";
interface IProps {
  close: () => void;
  isOpen: boolean;
}
function ForgetPasswordModal({ isOpen, close }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode,setCountryCode]=useState("")
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
    setCountryCode(data.ccode)
    try {
      const response = await forgetPasswordAPI(data);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        close();
        setOtp(true);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const verifyOtp = async (
    e: React.FormEvent<HTMLFormElement>,
    { otp, mobile }: { otp: string; mobile: string },
    close: () => void
  ) => {
    e.preventDefault();
    try {
      const response = await verifyOtpAPI({
        mobile,
        otp,
        is_change_password: true,
      });
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        close();
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <Modal
        maxWidth="550px"
        className="text-2xl text-center p-4 border-b font-semibold"
        title="Forget password"
        close={close}
        isOpen={isOpen}
      >
        <Button onClick={close} className="absolute top-5 right-4">
          <span>
            <X className="text-black" size={20} />
          </span>
        </Button>
        <div className="p-5 md:py-8 md:px-10">
          <div className="pb-6">
            <p className="text-[#757575] font-medium px-1 text-center md:px-0 break-words">
              Just enter your phone number and we will send you the
              <span className="text-center"> verification code</span>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="mobile" className="text-600 font-medium text-sm">
                {t("phone_number")}
              </label>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your phone number"
                    className="cursor-pointer p-3 rounded-lg border border-gray-300 hover:border-black focus:border-primary outline-none"
                    id="mobile"
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/^0+/, "");
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </div>
            {errors["mobile"] && (
              <InputErrorMessage msg={errors["mobile"]?.message} />
            )}
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="password"
                className="text-600 font-medium text-sm"
              >
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
                      placeholder="Enter your new password"
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
            </div>
            {errors["password"] && (
              <InputErrorMessage msg={errors["password"]?.message} />
            )}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm_password"
                className="text-600 font-medium text-sm"
              >
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
                      placeholder="Confirm your new password"
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
              type="submit"
              className="bg-primary zoom w-full mt-6 py-3 px-3 rounded-lg text-white font-semibold text-sm text-center"
            >
              {loading ? <Loader /> : "Send OTP"}
            </Button>
          </form>
        </div>
      </Modal>
      <OtpModal
        close={() => setOtp(false)}
        isOpen={otp}
        mobile={phone}
        countryCode={countryCode}
        is_new_user={false}
        verifyOtp={verifyOtp}
      />
    </>
  );
}

export default ForgetPasswordModal;
