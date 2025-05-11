import { useState } from "react";
import Modal from "../ui/Modal";
import RatingForm from "./RatingForm";
import { useTranslation } from "react-i18next";
import { IIndividualRate } from "@/interfaces/booking";
import DeleteRatingModal from "./DeleteRatingModal";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking_id: string;
  individual_rate: IIndividualRate;
}

const RatingModal = ({
  isOpen,
  onClose,
  booking_id,
  individual_rate,
}: RatingModalProps) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(Number(individual_rate?.rate) || 0);
  const [comment, setComment] = useState(individual_rate?.comment || "");
  const [errorComment, setErrorComment] = useState("");
  const [isDeleteRatingModalOpen, setIsDeleteRatingModalOpen] = useState(false);
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    const isOnlyDigits = /^\d+$/.test(value);
    if (value && isOnlyDigits) {
      setErrorComment(t("comment_error_rating"));
    } else {
      setErrorComment("");
    }
  };
  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };
  return (
    <>
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
          errorComment={errorComment}
          individual_rate={individual_rate}
          handleRatingChange={handleRatingChange}
          handleCommentChange={handleCommentChange}
          close={onClose}
          openDeleteRatingModal={() => setIsDeleteRatingModalOpen(true)}
        />
      </Modal>
      {isDeleteRatingModalOpen && (
        <DeleteRatingModal
          isOpen={isDeleteRatingModalOpen}
          close={() => setIsDeleteRatingModalOpen(false)}
          id={individual_rate?.id}
        />
      )}
    </>
  );
};
export default RatingModal;
