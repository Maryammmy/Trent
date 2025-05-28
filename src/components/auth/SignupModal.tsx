import { Eye, EyeOff, X } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signupData } from "../../data/auth";
import { setIsSignup } from "../../store/features/auth/authSlice";
import { verifyOtpAPI, verifySignupAPI } from "../../services/authService";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import { signupSchema } from "../../validation/signupSchema ";
import InputErrorMessage from "../ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../loader/Loader";
import CountrySelector from "../ui/CountrySelector";
import { SignupNameInputs } from "../../types";
import OtpModal from "./OtpModal";
import { Trans, useTranslation } from "react-i18next";
import { ApiError } from "@/interfaces";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function SignupModal() {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [otp, setOtp] = useState(false);
  const dispatch = useAppDispatch();
  const { isSignup } = useAppSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupNameInputs>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      mobile: "",
      password: "",
      ccode: "+20",
      confirmPassword: "",
      email: "",
      name: "",
    },
  });
  const handleTermsChange = () => {
    setAcceptedTerms(!acceptedTerms);
    if (!acceptedTerms) {
      setTermsError("");
    }
  };
  const onSubmit: SubmitHandler<SignupNameInputs> = async (data) => {
    if (!acceptedTerms) {
      setTermsError(t("terms_required"));
      return;
    }
    setLoading(true);
    setMobile(data.mobile);
    setCountryCode(data.ccode);
    try {
      const response = await verifySignupAPI(data);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        dispatch(setIsSignup(false));
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
    { otp, mobile, ccode }: { otp: string; mobile: string; ccode: string },
    close: () => void
  ) => {
    e.preventDefault();
    try {
      const response = await verifyOtpAPI({
        mobile,
        ccode,
        otp,
        is_change_password: null,
      });
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        Cookies.set("user_id", response?.data.data?.user_login?.id, {
          expires: 365,
        });
        setTimeout(() => {
          close();
          window.location.reload();
        }, 500);
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
        maxWidth="600px"
        className="text-2xl text-center p-4 border-b font-semibold"
        title="Sign up"
        close={() => dispatch(setIsSignup(false))}
        isOpen={isSignup}
      >
        <Button
          onClick={() => dispatch(setIsSignup(false))}
          className="absolute top-5 right-4 text-gray-500"
        >
          <span>
            <X size={20} />
          </span>
        </Button>
        <div className="pb-3">
          <div className="p-5 md:py-8 md:px-10 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold pb-5">
              {t("welcome_to_Trent")}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {signupData.map(({ name, label, type, placeholder }) => (
                <Fragment key={name}>
                  {name === "mobile" ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        {t(label)}
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
                          name={name}
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              placeholder={t("enter_phone_number")}
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
                  ) : (
                    <Controller
                      name={name}
                      control={control}
                      render={({ field }) => (
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">
                            {t(label)}
                          </label>
                          <div className="flex w-full border border-gray-300 rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                            {name === "password" ||
                            name === "confirmPassword" ? (
                              <>
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder={t(placeholder)}
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
                              </>
                            ) : (
                              <Input
                                {...field}
                                type={type}
                                placeholder={t(placeholder)}
                                className="w-full outline-none"
                              />
                            )}
                          </div>
                          {errors[name] && (
                            <InputErrorMessage msg={errors[name]?.message} />
                          )}
                        </div>
                      )}
                    />
                  )}
                </Fragment>
              ))}

              <div className="my-4">
                <div className="flex items-center gap-2 font-medium">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={handleTermsChange}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-dark">
                    <Trans
                      i18nKey="terms_label"
                      components={{
                        guest: (
                          <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            to="/guest-terms"
                            className="text-primary hover:underline"
                          />
                        ),
                        host: (
                          <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            to="/host-terms"
                            className="text-primary hover:underline"
                          />
                        ),
                      }}
                    />
                  </label>
                </div>
                {termsError && <InputErrorMessage msg={termsError} />}
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full zoom bg-primary mt-2 text-white py-3 rounded-lg font-bold"
              >
                {loading ? <Loader /> : t("sign_up")}
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      {otp && (
        <OtpModal
          isOpen={otp}
          close={() => setOtp(false)}
          mobile={mobile}
          countryCode={countryCode}
          verifyOtp={verifyOtp}
        />
      )}
    </>
  );
}

export default SignupModal;
