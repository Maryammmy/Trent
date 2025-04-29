import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { IVerifyPropertyResponse } from "@/interfaces/booking";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface IProps {
  isSuccess: boolean;
  onClose: () => void;
  bookingData: IVerifyPropertyResponse;
}
function SuccessBookingModal({ isSuccess, onClose, bookingData }: IProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isSuccess}
      close={onClose}
      title={t("booking_successful")}
      className="text-xl text-center pt-6 pb-3 font-semibold"
    >
      <div className="px-6 pb-6 space-y-6 font-medium">
        <p className="text-dark text-center">
          Your booking has been successfully placed. A confirmation message has
          been sent to your WhatsApp.
        </p>
        <div className="">
          <h2>{bookingData?.title}</h2>
          <p>
            <span className="font-medium"> {t("check_in")} :</span>{" "}
            {bookingData?.from_date}
          </p>
          <p>
            <span className="font-medium"> {t("check_out")} :</span>{" "}
            {bookingData?.to_date}
          </p>
          <p>
            <span className="font-medium">{t("total")} :</span>{" "}
            {Math.round(bookingData?.final_total)} {t("price_per_night")}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <Link
            to={`/account-settings/bookings`}
            className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
          >
            View Receipt
          </Link>
          <Button
            type="button"
            onClick={onClose}
            className="w-32 py-2 bg-gray-200 text-primary rounded-md hover:bg-gray-200/80"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessBookingModal;
