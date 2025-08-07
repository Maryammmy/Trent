import Loader from "@/components/loader/Loader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { uid } from "@/constants";
import { cancelNonCompletedBookingAPI } from "@/services/bookingService";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
interface IProps {
  id: string;
  cancelInCompletedBooking: boolean;
  close: () => void;
}
function CancelInCompletedBookingModal({
  id,
  cancelInCompletedBooking,
  close,
}: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handleCancel = async () => {
    try {
      setLoading(true);
      const response = await cancelNonCompletedBookingAPI({ uid, item_id: id });
      if (response?.data?.response_code === 200) {
        toast.success(response.data.response_message);
        setTimeout(() => {
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
      dialogPanelClassName="max-w-[450px]"
      isOpen={cancelInCompletedBooking}
      close={close}
      title={t("cancel_incompleted_booking")}
      className="text-center font-bold text-2xl p-6 pb-0 text-primary"
    >
      <div className="p-5 md:pb-8 pt-5 md:px-10">
        <p className="font-medium text-center">
          {t("cancel_incompleted_booking_desc")}
        </p>
        <div className="flex pt-5 justify-between space-x-3">
          <Button
            className="bg-primary font-medium hover:bg-primary/80 text-white py-2 w-24 rounded-md"
            type="button"
            onClick={close}
          >
            {t("close")}
          </Button>
          <Button
            className="bg-red-600 font-medium hover:bg-red-600/80 text-white py-2 w-24 rounded-md"
            disabled={loading}
            onClick={handleCancel}
          >
            {loading ? <Loader /> : t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CancelInCompletedBookingModal;
