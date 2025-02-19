import { Eye, EyeOff, X } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginData } from "../data/authData";
import { setIsloggedin } from "../store/features/auth/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginNameInputs } from "../interfaces/authInterface";
import { loginAPI } from "../services/authService";
import { loginSchema } from "../validation/loginSchema";
import InputErrorMessage from "./ui/InputErrorMessage";
import Loader from "./loader/Loader";
import { useState } from "react";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function LoginModal() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoggedin } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginNameInputs>({
    resolver: yupResolver(loginSchema),
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
      className="text-lg text-center p-4 border-b font-semibold"
      title="Log in"
      close={() => dispatch(setIsloggedin(false))}
      isOpen={isLoggedin}
    >
      <Button
        onClick={() => dispatch(setIsloggedin(false))}
        className="absolute top-5 right-4 text-gray-500 hover:text-black"
      >
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-6">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">Welcome to Trent</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginData.map((input, index) => {
            const { label, name, placeholder, type } = input;
            return (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                {name === "password" ? (
                  <div className="flex w-full border border-gray-300 rounded-lg focus-within:border-2 focus-within:border-primary p-2">
                    <Input
                      {...register(name)}
                      type={showPassword ? "text" : "password"}
                      placeholder={placeholder}
                      className="w-full bg-transparent outline-none"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span>
                        {showPassword ? (
                          <EyeOff strokeWidth={2.5} className="text-dark" />
                        ) : (
                          <Eye strokeWidth={2.5} className="text-dark" />
                        )}
                      </span>
                    </Button>
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg focus-within:border-2 focus-within:border-primary p-2">
                    <Input
                      {...register(name)}
                      type={type}
                      placeholder={placeholder}
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                )}
                {errors[name] && (
                  <InputErrorMessage msg={errors[name]?.message} />
                )}
              </div>
            );
          })}
          <div className="flex justify-end mb-4">
            <Link to="/" className="font-medium">
              <span>Forget password?</span>
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-bold"
          >
            <span>{loading ? <Loader /> : "Log in"}</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default LoginModal;
