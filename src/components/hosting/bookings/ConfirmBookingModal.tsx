import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { ApiError } from "@/interfaces";
import Cookies from "js-cookie";
import { CurrentLanguage } from "@/types";
import { confirmBookingAPI } from "@/services/bookingService"; // افترضنا إنه عندك API اسمه confirmBookingAPI
import Loader from "@/components/loader/Loader";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");

interface IProps {
  isOpen: boolean;
  close: () => void;
  bookingId: string;
}

export default function ConfirmBookingModal({
  isOpen,
  close,
  bookingId,
}: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    try {
      setLoading(true);
      const payload = {
        uid: uid || "",
        lang: currentLanguage,
        booking_id: bookingId,
        is_confirmed: true,
      };
      const response = await confirmBookingAPI(payload); // Use your actual API here
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={t("confirm_booking")}
      className="text-lg md:text-2xl font-semibold text-center p-4 pb-0"
    >
      <Button onClick={close} className="absolute top-5 right-4">
        <X size={20} />
      </Button>
      <div className="p-5 md:py-8 md:px-10 space-y-6">
        <p className="text-dark text-center font-medium">
          {t("are_you_sure_confirm_booking")}
        </p>

        <div className="flex justify-between gap-4 font-medium">
          <Button
            onClick={close}
            className="w-32 py-2 bg-gray-200 text-primary rounded-md hover:bg-gray-200/80"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-32 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
            disabled={loading}
          >
            {loading ? <Loader /> : t("confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
