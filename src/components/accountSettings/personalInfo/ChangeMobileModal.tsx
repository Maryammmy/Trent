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

interface IProps {
  isOpen: boolean;
  close: () => void;
  phone: string;
}
function ChangeMobileModal({ isOpen, close, phone }: IProps) {
  const { t } = useTranslation();
  const [newPhone, setNewPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const handleChangeNewMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^0+/, "");
    setNewPhone(value);
  };
  const changeMobile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await changeMobileAPI({
        old_mobile: phone,
        new_mobile: newPhone,
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
    { otp, mobile }: { otp: string; mobile: string },
    close: () => void
  ) => {
    e.preventDefault();
    try {
      const response = await verifyOtpAPI({
        mobile,
        otp,
        is_change_password: false,
      });
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        close();
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
        title="Chnage phone number"
        close={() => {
          close();
          setNewPhone("");
        }}
        isOpen={isOpen}
      >
        <Button onClick={close} className="absolute top-5 right-4">
          <span>
            <X className="text-black" size={20} />
          </span>
        </Button>
        <div className="p-5 md:py-8 md:px-10">
          <div className="pb-6">
            <p className="text-[#757575] font-medium px-1 text-center md:px-0 break-words">
              Enter your new phone number
            </p>
          </div>
          <form onSubmit={changeMobile}>
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="oldMobile"
                className="text-600 font-medium text-sm"
              >
                Old phone number
              </label>
              <Input
                value={phone}
                type="text"
                placeholder="Enter your old phone number"
                className="cursor-pointer p-3 rounded-lg border-2 border-gray-300 hover:border-black focus:border-primary outline-none"
                id="oldMobile"
                name="old_mobile"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="newMobile"
                className="text-600 font-medium text-sm"
              >
                New phone number
              </label>
              <Input
                value={newPhone}
                onChange={handleChangeNewMobile}
                type="text"
                placeholder="Enter your new phone number"
                className="cursor-pointer p-3 rounded-lg border-2 border-gray-300 hover:border-black focus:border-primary outline-none"
                id="newMobile"
                name="new_mobile"
              />
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
      <OtpModal
        close={() => setOtp(false)}
        isOpen={otp}
        mobile={phone}
        verifyOtp={verifyOtp}
      />
    </>
  );
}

export default ChangeMobileModal;
