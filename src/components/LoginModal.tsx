import { X } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginData } from "../data/authData";
import { setIsloggedin } from "../store/features/auth/authSlice";
import SocialAuthButtons from "./SocialAuthButtons";
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

function LoginModal() {
  const [loading, setLoading] = useState(false);
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
                {name === "mobile" ? (
                  <div className="flex items-center">
                    <Input
                      {...register("ccode")}
                      type="text"
                      value="+20"
                      disabled
                      className="w-16 border border-gray-300 rounded-l-lg bg-gray-100 text-center p-2"
                    />
                    <Input
                      {...register(name)}
                      type={type}
                      placeholder={placeholder}
                      className="flex-1 border border-gray-300 rounded-r-lg focus:outline-primary p-2"
                    />
                  </div>
                ) : (
                  <Input
                    {...register(name)}
                    type={type}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg focus:outline-primary p-2"
                  />
                )}
                {errors[name] && (
                  <InputErrorMessage msg={errors[name]?.message} />
                )}
              </div>
            );
          })}
          <Button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-bold"
          >
            <span>{loading ? <Loader /> : "Log in"}</span>
          </Button>
        </form>
        <SocialAuthButtons />
      </div>
    </Modal>
  );
}

export default LoginModal;
