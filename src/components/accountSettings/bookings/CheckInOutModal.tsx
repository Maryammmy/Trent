import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { checkInOutAPI } from "@/services/bookingService";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import { currentLanguage, uid } from "@/constants";
import { handleErrorMessage } from "@/utils/handleErrorMsg";

interface IProps {
  isOpen: boolean;
  close: () => void;
  bookingId: string;
  isCheckIn: boolean;
}

function CheckInOutModal({ isOpen, close, bookingId, isCheckIn }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    try {
      setLoading(true);
      const payload = {
        uid: uid,
        lang: currentLanguage,
        booking_id: bookingId,
        is_check_in: isCheckIn,
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
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={t(isCheckIn ? "confirm_check_in" : "confirm_check_out")}
      className="text-2xl font-semibold text-center p-5 pb-0"
    >
      <div className="p-5 md:pb-8 pt-5 md:px-10 space-y-5">
        <p className="text-dark text-center font-medium">
          {t(
            isCheckIn
              ? "are_you_sure_you_want_to_check_in"
              : "are_you_sure_you_want_to_check_out"
          )}
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
            onClick={handleCheck}
            className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
          >
            {loading ? (
              <Loader />
            ) : (
              t(isCheckIn ? "check_in_btn" : "check_out_btn")
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CheckInOutModal;
