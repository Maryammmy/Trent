import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useState } from "react";
import { checkInOutAPI } from "@/services/bookingService";
import toast from "react-hot-toast";
import { ApiError } from "@/interfaces";
import { CurrentLanguage } from "@/types";
import Cookies from "js-cookie";
import Loader from "@/components/loader/Loader";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
interface IProps {
  isOpen: boolean;
  close: () => void;
  bookingId: string;
}

function CheckInModal({ isOpen, close, bookingId }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const payload = {
        uid: uid || "",
        lang: currentLanguage,
        booking_id: bookingId,
        is_check_in: true,
      };
      const response = await checkInOutAPI(payload);
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
      title={t("confirm_check_in")}
      className="text-lg md:text-2xl font-semibold text-center p-5 pb-0"
    >
      <Button onClick={close} className="absolute top-5 right-4">
        <X size={20} />
      </Button>
      <div className="p-5 space-y-5">
        <p className="text-dark text-center font-medium">
          {t("are_you_sure_you_want_to_check_in")}
        </p>
        <div className="flex justify-between gap-4 font-medium">
          <Button
            type="button"
            onClick={close}
            className="w-32 py-2 bg-gray-200 text-primary rounded-md hover:bg-gray-200/80"
          >
            {t("cancel")}
          </Button>
          <Button
            disabled={loading}
            onClick={handleCheckIn}
            className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
          >
            {loading ? <Loader /> : t("check_in_btn")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CheckInModal;
