import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import InputErrorMessage from "../ui/InputErrorMessage";
import Loader from "../loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsloggedin } from "../../store/features/auth/authSlice";
import { loginSchema } from "../../validation/loginSchema";
import { loginAPI } from "../../services/authService";
import { LoginNameInputs } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { useTranslation } from "react-i18next";
import CountrySelector from "../ui/CountrySelector";
import { handleErrorMessage } from "@/utils/handleErrorMsg";

function LoginModal() {
  const { t } = useTranslation();
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedin } = useAppSelector((state) => state.auth);
  const from = location.state || "/";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginNameInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: { mobile: "", password: "", ccode: "+20" },
  });
  const onSubmit: SubmitHandler<LoginNameInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await loginAPI(data);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        Cookies.set("user_id", response?.data?.data?.user_login?.id, {
          expires: 365,
        });
        setTimeout(() => {
          dispatch(setIsloggedin(false));
          navigate(from, { replace: true });
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        className="text-2xl text-center p-4 border-b font-semibold"
        dialogPanelClassName="max-w-[600px]"
        title={t("log_in")}
        close={() => dispatch(setIsloggedin(false))}
        isOpen={isLoggedin}
      >
        <div className="p-5 md:py-8 md:px-10">
          <h2 className="text-lg font-semibold pb-5">
            {t("welcome_to_Trent")}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t("phone_number")}
              </label>
              <div
                dir="ltr"
                className="flex items-center gap-2 border rounded-lg p-3 focus-within:border-2 focus-within:border-primary"
              >
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
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {t("password")}
                  </label>
                  <div className="flex w-full border border-gray-300 rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder={t("enter_password")}
                      className="w-full outline-none"
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
                  {errors.password && (
                    <InputErrorMessage msg={errors.password.message} />
                  )}
                </div>
              )}
            />
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                onClick={() => {
                  setIsForgetPassword(true);
                  dispatch(setIsloggedin(false));
                }}
                className="font-medium"
              >
                <span>{t("forget_password")}</span>
              </Button>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full zoom bg-primary text-white py-3 rounded-lg font-bold"
            >
              {loading ? <Loader /> : t("log_in")}
            </Button>
          </form>
        </div>
      </Modal>
      <ForgetPasswordModal
        isOpen={isForgetPassword}
        close={() => setIsForgetPassword(false)}
      />
    </>
  );
}

export default LoginModal;
