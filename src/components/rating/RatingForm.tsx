import { Star, X } from "lucide-react";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ApiError } from "@/interfaces";
import toast from "react-hot-toast";
import { addAndUpdateRatingAPI } from "@/services/ratingService";
import Loader from "../loader/Loader";
import InputErrorMessage from "../ui/InputErrorMessage";
import { IIndividualRate } from "@/interfaces/booking";
interface IProps {
  rating: number;
  comment: string;
  booking_id: string;
  errorComment: string;
  individual_rate: IIndividualRate;
  openDeleteRatingModal: () => void;
  handleRatingChange: (rating: number) => void;
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  close: () => void;
}
const RatingForm = ({
  rating,
  comment,
  booking_id,
  errorComment,
  individual_rate,
  openDeleteRatingModal,
  handleRatingChange,
  handleCommentChange,
  close,
}: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await addAndUpdateRatingAPI({
        booking_id,
        rating,
        ...(comment.trim() && { comment }),
      });
      if (response?.data?.response_code === 201) {
        toast.success(response?.data?.response_message);
        setTimeout(() => {
          close();
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-5 md:px-10">
        <Button onClick={close} className="absolute top-5 right-4">
          <span>
            <X size={20} />
          </span>
        </Button>
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                type="button"
                key={star}
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            ))}
          </div>
          <div>
            <TextArea
              placeholder={t("write_review")}
              value={comment}
              onChange={handleCommentChange}
              maxLength={500}
              className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
              rows={3}
            />
            {errorComment && <InputErrorMessage msg={errorComment} />}
          </div>
          {individual_rate?.rate ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pb-5">
              <Button
                onClick={handleSubmit}
                className="w-full zoom bg-primary text-white py-3 rounded-lg font-bold"
                disabled={rating === 0 || Boolean(errorComment)}
              >
                {loading ? <Loader /> : t("submit_review")}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  close();
                  openDeleteRatingModal();
                }}
                className="w-full zoom bg-red-600 text-white py-3 rounded-lg font-bold"
              >
                {t("delete_review")}
              </Button>
            </div>
          ) : (
            <div className="pb-5">
              <Button
                onClick={handleSubmit}
                className="w-full zoom bg-primary text-white py-3 rounded-lg font-bold"
                disabled={rating === 0 || Boolean(errorComment)}
              >
                {loading ? <Loader /> : t("submit_review")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default RatingForm;
