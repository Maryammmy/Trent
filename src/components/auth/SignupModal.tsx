import { Eye, EyeOff, X } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signupData } from "../../data/authData";
import { setIsSignup } from "../../store/features/auth/authSlice";
import { verifysignupAPI } from "../../services/authService";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import { signupSchema } from "../../validation/signupSchema ";
import InputErrorMessage from "../ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../loader/Loader";
import { AxiosError } from "axios";
import CountrySelector from "../ui/CountrySelector";
import { SignupNameInputs } from "../../types";
import Cookies from "js-cookie";

function SignupModal() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
  console.log(errors);
  const onSubmit: SubmitHandler<SignupNameInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await verifysignupAPI(data);
      if (response?.data?.ResponseCode === "200") {
        toast.success(response?.data?.ResponseMsg);
        Cookies.set("user_id", response?.data?.UserLogin?.id, { expires: 365 });
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
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-10 max-h-[80vh] overflow-y-auto">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">Welcome to Trent</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signupData.map(({ name, label, type, placeholder }) => (
            <Fragment key={name}>
              {name === "mobile" && (
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
              )}
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    <div className="flex w-full border hover:border-black border-gray-300 rounded-lg p-3 focus-within:border-2 !focus-within:border-primary">
                      {name === "password" || name === "confirmPassword" ? (
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
                          onChange={(e) => {
                            let value = e.target.value;
                            if (name === "mobile") {
                              value = value.replace(/^0+/, "");
                            }
                            field.onChange(value);
                          }}
                        />
                      )}
                    </div>
                    {errors[name] && (
                      <InputErrorMessage msg={errors[name]?.message} />
                    )}
                  </div>
                )}
              />
            </Fragment>
          ))}

          <Button
            disabled={loading}
            type="submit"
            className="w-full zoom bg-primary text-white py-2 rounded-lg font-bold"
          >
            {loading ? <Loader /> : "Sign up"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default SignupModal;
