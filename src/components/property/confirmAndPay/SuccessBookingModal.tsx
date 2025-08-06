import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ISaveBookingResponse } from "@/interfaces/booking";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface IProps {
  isSuccess: boolean;
  onClose: () => void;
  bookingData: ISaveBookingResponse;
}
function SuccessBookingModal({ isSuccess, onClose, bookingData }: IProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isSuccess}
      close={onClose}
      title={t("booking_successful")}
      className="text-xl text-center pt-6 pb-2 font-semibold"
      dialogPanelClassName="max-w-[500px]"
    >
      <div className="px-5 md:px-10 pb-6">
        <p className="text-dark text-center font-medium pb-3">
          {t("booking_success_desc")}
        </p>
        <div className="space-y-1 pb-4">
          <h2 className="font-semibold text-lg">{bookingData?.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:flex-row sm:gap-5 font-medium">
            <div>
              <span> {t("check_in")} :</span>{" "}
              <span>{bookingData?.from_date}</span>
            </div>
            <div>
              <span> {t("check_out")} :</span>{" "}
              <span>{bookingData?.to_date}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:flex-row sm:gap-5 font-medium">
            <div>
              <span> {t("guests")} :</span>{" "}
              <span>{bookingData?.guest_count}</span>
            </div>
            <div>
              <span> {t("booking_status")} :</span>{" "}
              <span className="text-primary font-semibold">
                {bookingData?.book_status}
              </span>
            </div>
          </div>
          <p className="font-semibold text-lg">
            <span className="">{t("total")} :</span> {bookingData?.final_total}{" "}
            {t("EGP")}
          </p>
        </div>
        <div className="flex justify-between gap-4 font-medium">
          <Button
            type="button"
            onClick={onClose}
            className="w-32 py-2 bg-gray-200 text-primary rounded-md hover:bg-gray-200/80"
          >
            {t("close")}
          </Button>
          <Link
            to={`/account-settings/bookings/${bookingData?.book_id}?status=active`}
            className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
          >
            {t("view_receipt")}
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessBookingModal;
