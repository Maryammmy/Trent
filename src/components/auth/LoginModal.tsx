import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import InputErrorMessage from "../ui/InputErrorMessage";
import Loader from "../loader/Loader";
import CountrySelector from "../ui/CountrySelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsForgetPassword,
  setIsloggedin,
} from "../../store/features/auth/authSlice";
import { loginSchema } from "../../validation/loginSchema";
import { LoginNameInputs } from "../../interfaces/authInterface";
import { loginAPI } from "../../services/authService";
import { loginData } from "../../data/authData";

function LoginModal() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoggedin } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginNameInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: { mobile: "", password: "", ccode: "+20" },
  });

  const onSubmit: SubmitHandler<LoginNameInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await loginAPI(data);
      if (response?.data?.ResponseCode === "200") {
        toast.success(response?.data?.ResponseMsg);
        Cookies.set("user_id", response?.data?.UserLogin?.id, { expires: 365 });
        setTimeout(() => {
          dispatch(setIsloggedin(false));
          window.location.reload();
        }, 500);
      } else {
        toast.error(response?.data?.ResponseMsg);
      }
    } catch (error) {
      const customError = error as AxiosError;
      toast.error(customError?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      maxWidth="600px"
      className="text-2xl text-center p-4 border-b font-semibold"
      title="Log in"
      close={() => dispatch(setIsloggedin(false))}
      isOpen={isLoggedin}
    >
      <Button
        onClick={() => dispatch(setIsloggedin(false))}
        className="absolute top-5 right-4"
      >
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-10">
        <h2 className="text-lg font-semibold pb-4">Welcome to Trent</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginData.map(({ name, label, type, placeholder }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  <div className="flex w-full border border-gray-300 rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                    {name === "password" ? (
                      <>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder={placeholder}
                          className="w-full outline-none bg-transparent"
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
                        placeholder={placeholder}
                        className="w-full outline-none bg-transparent"
                      />
                    )}
                  </div>
                  {errors[name] && (
                    <InputErrorMessage msg={errors[name]?.message} />
                  )}
                </div>
              )}
            />
          ))}
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

          <div className="flex justify-end mb-4">
            <Button
              type="button"
              onClick={() => {
                dispatch(setIsForgetPassword(true));
                dispatch(setIsloggedin(false));
              }}
              className="font-medium"
            >
              <span> Forget password?</span>
            </Button>
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="w-full zoom bg-primary text-white py-2 rounded-lg font-bold"
          >
            {loading ? <Loader /> : "Log in"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default LoginModal;
