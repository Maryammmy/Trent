import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import {
  cancelNonCompletedBookingAPI,
  useNonCompletedBookingAPI,
  verifyPropertyAPI,
} from "@/services/bookingService";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { currentLanguage, uid } from "@/constants";
import toast from "react-hot-toast";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader/Loader";

function InCompletedBookingModal() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = useNonCompletedBookingAPI();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("nonCompletedBookingShown");
    if (!hasSeenPopup && data?.data?.data?.Booking?.length) {
      setIsOpen(true);
      sessionStorage.setItem("nonCompletedBookingShown", "true"); // mark as shown
    }
  }, [data]);

  if (!data?.data?.data?.Booking?.length) return null;

  const lastBooking = data?.data?.data?.Booking?.slice(-1)[0];
  const { prop_id, confirm_guest_rules, id, from_date, to_date, guest_count } =
    lastBooking;
  const handleClose = () => setIsOpen(false);
  const handleCancel = async () => {
    try {
      setCancelLoading(true);
      const response = await cancelNonCompletedBookingAPI({ uid, item_id: id });
      if (response?.data?.response_code === 200) {
        toast.success(response.data.response_message);
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setCancelLoading(false);
    }
  };

  const handleVerifyProperty = async () => {
    try {
      setLoading(true);
      const payload = {
        prop_id,
        guest_counts: guest_count,
        from_date,
        to_date,
        confirm_guest_rules,
        uid,
        lang: currentLanguage,
      };

      const response = await verifyPropertyAPI(payload);
      if (response?.data?.response_code === 200) {
        toast.success(response.data.response_message);
        setTimeout(() => {
          navigate(`/properties/${prop_id}/confirm-and-pay`, {
            state: {
              data: {
                ...response.data.data.booking_details,
                confirm_guest_rules,
              },
            },
          });
          handleClose();
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
      close={handleClose}
      title={t("incomplete_booking")}
      className="text-xl text-center pt-6 pb-2 font-semibold"
    >
      <div className="px-5 md:px-10 pb-6">
        <p className="text-dark text-center font-medium pb-3">
          {t("in_completed_booking_desc")}
        </p>
        <div className="space-y-1 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:flex-row sm:gap-5 font-medium">
            <div>
              <span>{t("check_in")} :</span> <span>{from_date}</span>
            </div>
            <div>
              <span>{t("check_out")} :</span> <span>{to_date}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:flex-row sm:gap-5 font-medium">
            <div>
              <span>{t("guests")} :</span> <span>{guest_count}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 font-medium">
          <Button
            onClick={handleCancel}
            type="button"
            className="w-32 py-2 bg-gray-200 text-primary rounded-md hover:bg-gray-200/80"
          >
            {cancelLoading ? <Loader /> : t("cancel")}
          </Button>
          <Button
            onClick={handleVerifyProperty}
            className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
          >
            {loading ? <Loader /> : t("continue")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default InCompletedBookingModal;
