import Modal from "../ui/Modal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
function PayoutDetailsModal({ isOpen, onClose }: IProps) {
  return (
    <Modal title="Payout Details" isOpen={isOpen} close={onClose}>
      <h2></h2>
    </Modal>
  );
}

export default PayoutDetailsModal;
