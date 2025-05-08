import { useState } from "react";
import Modal from "../ui/Modal";
import RatingForm from "./RatingForm";
import { useTranslation } from "react-i18next";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking_id: string;
  prop_id: string;
}

const RatingModal = ({
  isOpen,
  onClose,
  booking_id,
  prop_id,
}: RatingModalProps) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };
  return (
    <Modal
      title={t("rate_your_stay")}
      className="text-2xl text-center pt-6 font-semibold"
      isOpen={isOpen}
      close={onClose}
    >
      <RatingForm
        rating={rating}
        comment={comment}
        booking_id={booking_id}
        prop_id={prop_id}
        handleRatingChange={handleRatingChange}
        handleCommentChange={handleCommentChange}
        close={onClose}
      />
    </Modal>
  );
};
export default RatingModal;
