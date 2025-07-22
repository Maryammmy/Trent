import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  cancelBookingAPI,
  useCancelBookingAPI,
} from "@/services/bookingService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Loader from "@/components/loader/Loader";
import UpdateSkeleton from "@/components/skeleton/UpdateSkeleton";
import { ICancelReason } from "@/interfaces/booking";
import { currentLanguage, uid } from "@/constants";
import { handleErrorMessage } from "@/utils/handleErrorMsg";

interface IProps {
  isOpen: boolean;
  close: () => void;
  bookingId: string;
}

export default function CancelBookingModal({
  isOpen,
  close,
  bookingId,
}: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { data } = useCancelBookingAPI();
  const reasons: ICancelReason[] = data?.data?.data?.cancel_reason_list;
  const [selectedReason, setSelectedReason] = useState<string>("");
  const cancelBooking = async () => {
    try {
      setLoading(true);
      const payload = {
        uid: uid,
        lang: currentLanguage,
        booking_id: bookingId,
        cancel_id: selectedReason,
      };
      const response = await cancelBookingAPI(payload);
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
      title={t("select_cancellation_reason")}
      className="text-lg md:text-2xl max-w-60 md:max-w-sm mx-auto font-semibold p-4 pb-0 text-center"
    >
      <div className="pb-3">
        <div className="p-5 md:pb-8 pt-5 md:px-10 sm:max-h-[80vh] sm:overflow-y-auto">
          {!reasons ? (
            <UpdateSkeleton cards={4} />
          ) : reasons?.length ? (
            <>
              <div className="flex flex-col gap-2">
                {reasons?.map((r) => (
                  <label
                    key={r.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="cancelReason"
                      value={r?.id}
                      checked={selectedReason === r?.id}
                      onChange={() => setSelectedReason(r?.id)}
                      className="accent-primary w-4 h-4 shrink-0"
                    />
                    <span className="font-medium">{r?.reason}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between gap-4 pt-6 font-medium">
                <Button
                  type="button"
                  onClick={close}
                  className="w-32 py-2 bg-gray-200 text-primary rounded-md hover:bg-gray-200/80"
                >
                  {t("cancel")}
                </Button>
                <Button
                  disabled={!selectedReason || loading}
                  onClick={cancelBooking}
                  className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
                >
                  {loading ? <Loader /> : t("confirm")}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center text-lg h-[50vh] text-dark font-medium w-full">
              {t("no_properties_found")}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
