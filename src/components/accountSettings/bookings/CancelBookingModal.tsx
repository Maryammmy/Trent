import Modal from "@/components/ui/Modal";
import { useCancelBookingAPI } from "@/services/bookingService";
interface IProps {
  isOpen: boolean;
  close: () => void;
}
function CancelBookingModal({ isOpen, close }: IProps) {
  const { data } = useCancelBookingAPI();
  console.log(data?.data?.data?.cancel_reason_list);
  return (
    <Modal isOpen={isOpen} close={close}>
      <div>cancel</div>
    </Modal>
  );
}

export default CancelBookingModal;
