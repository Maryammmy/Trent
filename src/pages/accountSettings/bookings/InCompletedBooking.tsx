import { useState } from "react";
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

function InCompletedBooking() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = useNonCompletedBookingAPI();
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  if (!data?.data?.data?.Booking?.length) return null;

  const lastBooking = data.data.data.Booking.slice(-1)[0];
  const { prop_id, confirm_guest_rules, id, from_date, to_date, guest_count } =
    lastBooking;

  const handleCancel = async () => {
    try {
      setCancelLoading(true);
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
        }, 500);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-yellow-100 border border-yellow-400 rounded-md p-4 flex justify-between items-center text-dark font-semibold">
      <div>
        <span>⚠ {t("You have an incomplete booking")}</span>
        <div className="space-y-1 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:flex-row sm:gap-5 font-medium text-sm">
            <div>
              <span>{t("check_in")} :</span> <span>{from_date}</span>
            </div>
            <div>
              <span>{t("check_out")} :</span> <span>{to_date}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={handleVerifyProperty}
          className="bg-primary text-white w-32 py-2 rounded-md"
        >
          {loading ? <Loader /> : t("Continue")}
        </Button>
        <Button
          onClick={handleCancel}
          className="bg-gray-400 text-white w-32 py-2 rounded-md"
        >
          {cancelLoading ? <Loader /> : t("Cancel")}
        </Button>
      </div>
    </div>
  );
}

export default InCompletedBooking;
