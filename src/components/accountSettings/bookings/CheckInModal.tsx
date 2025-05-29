import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

interface IProps {
  isOpen: boolean;
  close: () => void;
  bookingId: string;
}

function CheckInModal({ isOpen, close, bookingId }: IProps) {
  const { t } = useTranslation();

  const handleCheckIn = () => {
    // هنا تقدر تضيف لوجيك check-in API call
    console.log("Checked in booking:", bookingId);
    close();
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={t("confirm_check_in")}
      className="text-lg md:text-2xl font-semibold text-center p-4 pb-0"
    >
      <Button onClick={close} className="absolute top-5 right-4">
        <X size={20} />
      </Button>
      <div className="p-5 md:py-8 md:px-10 space-y-6">
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
            onClick={handleCheckIn}
            className="w-32 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80"
          >
            {t("check_in_btn")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CheckInModal;
