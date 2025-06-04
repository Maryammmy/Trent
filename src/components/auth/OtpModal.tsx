import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Loader from "../loader/Loader";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { sendOtpAPI } from "@/services/authService";
import { useTranslation } from "react-i18next";
import { ApiError } from "@/interfaces";
import toast from "react-hot-toast";

interface IProps {
  close: () => void;
  isOpen: boolean;
  mobile: string;
  countryCode: string;
  is_new_user?: boolean;
  verifyOtp: (
    e: React.FormEvent<HTMLFormElement>,
    { otp, mobile, ccode }: { otp: string; mobile: string; ccode: string },
    close: () => void
  ) => Promise<void>;
}

export default function OtpModal({
  close,
  isOpen,
  mobile,
  countryCode,
  verifyOtp,
  is_new_user,
}: IProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const handleOTPChange = (val: string) => {
    if (/^\d*$/.test(val)) {
      setOtp(val);
    }
  };
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(60);
    }
  }, [isOpen]);
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    await verifyOtp(e, { otp, mobile, ccode: countryCode }, close);
    setLoading(false);
  };
  const reSendOtp = async () => {
    if (timeLeft > 0) return;
    setResendLoading(true);
    try {
      const response = await sendOtpAPI({
        mobile,
        ccode: countryCode,
        is_new_user,
      });
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        setTimeLeft(60);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Modal
      maxWidth="500px"
      className="text-2xl text-center p-4 border-b font-semibold"
      title={t("verify_your_otp")}
      isOpen={isOpen}
      close={() => {
        close();
        setOtp("");
      }}
    >
      <Button onClick={close} className="absolute top-5 right-4">
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-5 md:py-8 md:px-10">
        <div className="pb-6">
          <p className="text-dark font-medium px-1 text-center md:px-0">
            {t("enter_otp_code")}
          </p>
        </div>
        <form onSubmit={verifyOTP}>
          <div className="pb-6" dir="ltr">
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
          <p className="text-sm text-dark font-semibold text-center mb-4">
            {timeLeft > 0
              ? `${t("resend_otp_in")} ${Math.floor(timeLeft / 60)}:${String(
                  timeLeft % 60
                ).padStart(2, "0")}`
              : t("didnt_receive_code")}
          </p>
          <Button
            disabled={loading || otp.length < 6}
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold"
          >
            {loading ? <Loader /> : t("confirm")}
          </Button>
          {timeLeft === 0 && (
            <Button
              type="button"
              className="w-full mt-4 text-primary font-bold"
              onClick={reSendOtp}
            >
              {resendLoading ? (
                <Loader borderColor="#223f7f" />
              ) : (
                t("resend_otp")
              )}
            </Button>
          )}
        </form>
      </div>
    </Modal>
  );
}
