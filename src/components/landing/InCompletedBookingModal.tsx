import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
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
import CancelInCompletedBookingModal from "../booking/inCompletedBooking/CancelInCompletedBookingModal";

function InCompletedBookingModal() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = useNonCompletedBookingAPI();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  console.log(data);
  useEffect(() => {
    // const hasSeenPopup = sessionStorage.getItem("nonCompletedBookingShown");
    if (data?.data?.data?.Booking?.length) {
      setIsOpen(true);
      // sessionStorage.setItem("nonCompletedBookingShown", "true"); // mark as shown
    }
  }, [data]);

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
  const handleClose = () => setIsOpen(false);
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
        setTimeout(() => {
          navigate(
            `/properties/${id}/confirm-and-pay?${queryParams.toString()}`,
            {
              state: {
                data: bookingDetails,
                ...(coupon && { coupon }),
              },
            }
          );
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
    <>
      <Modal
        closeBtn={false}
        canCloseOnOutsideClick={false}
        dialogPanelClassName="max-w-[450px]"
        isOpen={isOpen}
        close={handleClose}
        title={t("incomplete_booking")}
        className="text-2xl text-primary text-center pt-6 pb-2 font-bold"
      >
        <div className="px-5 md:px-10 pb-6">
          <p className="text-dark text-center font-medium pb-3">
            {t("in_completed_booking_desc")}
          </p>
          <div className="space-y-1 pb-4">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 sm:gap-5 font-medium text-sm">
              <div>
                <span>{t("check_in")} :</span> <span>{from_date}</span>
              </div>
              <div>
                <span>{t("check_out")} :</span> <span>{to_date}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 font-medium">
            <Button
              onClick={() => {
                handleClose();
                setCancelOpen(true);
              }}
              type="button"
              className="w-32 py-2 bg-gray-200 text-primary rounded-md hover:bg-gray-200/80"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleVerifyAndCheckPayment}
              className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
            >
              {loading ? <Loader /> : t("continue")}
            </Button>
          </div>
        </div>
      </Modal>
      <CancelInCompletedBookingModal
        cancelInCompletedBooking={cancelOpen}
        close={() => setCancelOpen(false)}
        id={id}
      />
    </>
  );
}

export default InCompletedBookingModal;
