import { useState } from "react";
import {
  paymentStatusAPI,
  useNonCompletedBookingAPI,
  verifyPropertyAPI,
} from "@/services/bookingService";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { currentLanguage, fawryPrivateKey, uid } from "@/constants";
import toast from "react-hot-toast";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader/Loader";
import { decryptFawryCredentials } from "@/utils/decryptFawryCredentials";
import CancelInCompletedBookingModal from "./CancelInCompletedBookingModal";

function InCompletedBooking() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = useNonCompletedBookingAPI();
  const [loading, setLoading] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  if (!data?.data?.data?.Booking?.length) return null;

  const lastBooking = data?.data?.data?.Booking?.slice(-1)[0];
  const {
    prop_id,
    ref_number,
    confirm_guest_rules,
    id,
    from_date,
    to_date,
    guest_count,
    coupon,
    fawry_number,
    method_key,
  } = lastBooking;
  const merchantRefNumber =
    decryptFawryCredentials(ref_number, fawryPrivateKey) || "";
  console.log(lastBooking);
  const fawryPaymentStatus = async (
    partialValue: string
  ): Promise<"PAID" | "UNPAID" | null> => {
    try {
      setLoading(true);
      const response = await paymentStatusAPI(
        merchantRefNumber,
        id,
        partialValue
      );
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        const status = response?.data?.data?.status ? "PAID" : "UNPAID";
        return status;
      }
      return null;
    } catch (error) {
      handleErrorMessage(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyAndCheckPayment = async () => {
    try {
      setLoading(true);

      // Step 1: Verify property
      const verifyPayload = {
        prop_id,
        guest_counts: guest_count,
        from_date,
        to_date,
        confirm_guest_rules,
        uid,
        lang: currentLanguage,
      };

      const verifyResponse = await verifyPropertyAPI(verifyPayload);
      if (verifyResponse?.data?.response_code === 200) {
        toast.success(verifyResponse.data.response_message);
        const bookingDetails = {
          ...verifyResponse?.data?.data?.booking_details,
          confirm_guest_rules,
        };

        sessionStorage.removeItem("couponResponse");
        sessionStorage.setItem("bookingData", JSON.stringify(bookingDetails));

        const queryParams = new URLSearchParams();

        // لو فيه merchantRefNumber، اعملي call للـ fawryPaymentStatus
        if (merchantRefNumber) {
          const status = await fawryPaymentStatus(
            bookingDetails?.partial_value
          );
          if (status) queryParams.set("orderStatus", status);
          if (method_key) queryParams.set("paymentMethod", method_key);
          if (fawry_number) queryParams.set("referenceNumber", fawry_number);
        }
        if (coupon) queryParams.set("coupon", coupon);
        // Step 3: Navigate to confirm and pay page WITH queryParams
        navigate(
          `/properties/${id}/confirm-and-pay?${queryParams.toString()}`,
          {
            state: {
              data: bookingDetails,
              ...(coupon && { coupon }),
            },
          }
        );
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-8 bg-yellow-100 border border-yellow-400 rounded-md p-4 flex justify-between items-center text-dark font-semibold">
        <div>
          <span>⚠ {t("You have an incomplete booking")}</span>
          <div className="space-y-1 pt-2">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 sm:gap-5 font-medium text-sm">
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
            onClick={handleVerifyAndCheckPayment}
            className="bg-primary text-white w-32 py-2 rounded-md"
          >
            {loading ? <Loader /> : t("Continue")}
          </Button>
          <Button
            onClick={() => setCancelOpen(true)}
            className="bg-gray-400 text-white w-32 py-2 rounded-md"
          >
            {t("Cancel")}
          </Button>
        </div>
      </div>
      <CancelInCompletedBookingModal
        cancelInCompletedBooking={cancelOpen}
        close={() => setCancelOpen(false)}
        id={id}
      />
    </>
  );
}

export default InCompletedBooking;
