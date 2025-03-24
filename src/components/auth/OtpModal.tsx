import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Loader from "../loader/Loader";
import { useState } from "react";
import { X } from "lucide-react";
import { verifyOtpAPI } from "@/services/authService";
import { useTranslation } from "react-i18next";
import { ApiError } from "@/interfaces";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface IProps {
  close: () => void;
  isOpen: boolean;
  mobile: string;
}
export default function OtpModal({ close, isOpen, mobile }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const handleOTPChange = (val: string) => {
    if (/^\d*$/.test(val)) {
      setOtp(val);
    }
  };
  const sendOtp = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyOtpAPI({ mobile, otp });
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      maxWidth="500px"
      className="text-2xl text-center p-4 border-b font-semibold"
      title="Verify Your OTP"
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
          <p className="text-dark font-medium px-1 text-center md:px-0">
            Please enter the 6-digit code sent to your phone
          </p>
        </div>
        <form onSubmit={sendOtp}>
          <div className="pb-6">
            <InputOTP value={otp} onChange={handleOTPChange} maxLength={6}>
              <InputOTPGroup className="flex justify-between items-center gap-2 w-full">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-lg font-medium border-2 border-dark rounded-lg"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            disabled={loading || otp.length < 6}
            type="submit"
            className="w-full zoom bg-primary text-white py-2 rounded-lg font-bold"
          >
            {loading ? <Loader /> : "Confirm"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
