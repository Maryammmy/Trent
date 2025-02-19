import { Eye, EyeOff, X } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { signupData } from "../data/authData";
import { setIsSignup } from "../store/features/auth/authSlice";
import { SignupNameInputs } from "../interfaces/authInterface";
import { signupAPI } from "../services/authService";
import toast from "react-hot-toast";
import { useState } from "react";
import { signupSchema } from "../validation/signupSchema ";
import InputErrorMessage from "./ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "./loader/Loader";
import { AxiosError } from "axios";

function SignupModal() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isSignup } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupNameInputs>({
    resolver: yupResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<SignupNameInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await signupAPI(data);
      if (response?.data?.ResponseCode === "200") {
        toast.success(response?.data?.ResponseMsg);
        setTimeout(() => {
          dispatch(setIsSignup(false));
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
      title="Sign up"
      close={() => dispatch(setIsSignup(false))}
      isOpen={isSignup}
    >
      <Button
        onClick={() => dispatch(setIsSignup(false))}
        className="absolute top-5 right-4 text-gray-500 hover:text-black"
      >
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">Welcome to Trent</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signupData.map((input, index) => {
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
                {errors[input.name] && (
                  <InputErrorMessage msg={errors[input.name]?.message} />
                )}
              </div>
            );
          })}
          <Button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-bold"
          >
            <span> {loading ? <Loader /> : "Sign up"}</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default SignupModal;
