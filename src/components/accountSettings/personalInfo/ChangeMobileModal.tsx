import OtpModal from "@/components/auth/OtpModal";
import Loader from "@/components/loader/Loader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { ApiError } from "@/interfaces";
import { verifyOtpAPI } from "@/services/authService";
import { changeMobileAPI } from "@/services/userService";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import CountrySelector from "@/components/ui/CountrySelector";
import { IChangeMobileInputs } from "@/interfaces/accountSettings";
import { changeMobileSchema } from "@/validation/changeMobileSchema";

interface IProps {
  isOpen: boolean;
  close: () => void;
  phone: string;
  countryCode: string;
}
function ChangeMobileModal({ isOpen, close, phone, countryCode }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IChangeMobileInputs>({
    resolver: yupResolver(changeMobileSchema),
    defaultValues: {
      new_mobile: "",
      new_ccode: "+20",
    },
  });
  const onSubmit: SubmitHandler<IChangeMobileInputs> = async (
    data: IChangeMobileInputs
  ) => {
    setLoading(true);
    try {
      const response = await changeMobileAPI({
        ...data,
        old_mobile: phone,
        old_ccode: countryCode,
      });
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
    { otp, mobile, ccode }: { otp: string; mobile: string; ccode: string },
    close: () => void
  ) => {
    e.preventDefault();
    try {
      const response = await verifyOtpAPI({
        mobile,
        ccode,
        otp,
        is_change_password: false,
      });
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
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
        maxWidth="550px"
        className="text-2xl text-center p-4 border-b font-semibold"
        title="Change phone number"
        close={() => {
          close();
          reset();
        }}
        isOpen={isOpen}
      >
        <Button onClick={close} className="absolute top-5 right-4">
          <span>
            <X size={20} />
          </span>
        </Button>
        <div className="p-5 md:py-8 md:px-10">
          <div className="pb-6">
            <p className="text-dark font-medium px-1 text-center md:px-0 break-words">
              Enter your new phone number
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-medium">Old phone number</label>
              <div className="flex items-center gap-2 border rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                <CountrySelector selectedCountry={countryCode} readOnly />
                <Input
                  value={phone}
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-medium">New phone number</label>
              <div className="flex items-center gap-2 border rounded-lg p-3 focus-within:border-2 focus-within:border-primary">
                <Controller
                  name="new_ccode"
                  control={control}
                  render={({ field }) => (
                    <CountrySelector
                      selectedCountry={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="new_mobile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your phone number"
                      className="w-full outline-none"
                      onChange={(e) => {
                        const value = e.target.value.replace(/^0+/, "");
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
              {errors.new_mobile && (
                <InputErrorMessage msg={errors.new_mobile.message} />
              )}
            </div>
            <Button
              type="submit"
              className="bg-primary zoom w-full mt-6 py-3 px-3 rounded-lg text-white font-semibold text-sm text-center"
            >
              {loading ? <Loader /> : "Send OTP"}
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
          verifyOtp={verifyOtp}
          is_new_user={false}
        />
      )}
    </>
  );
}

export default ChangeMobileModal;
