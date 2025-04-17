import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
function PayoutRequestModal({ isOpen, onClose }: IProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      close={onClose}
      title={t("payout_request")}
      className="text-center font-semibold text-xl p-4"
    >
      <div className="p-6"></div>
    </Modal>
  );
}

export default PayoutRequestModal;
