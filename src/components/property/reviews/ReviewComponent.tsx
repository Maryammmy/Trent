import { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import { useTranslation } from "react-i18next";
import { useRatingAPI } from "@/services/ratingService";
import { IRating } from "@/interfaces/rating";
interface IProps {
  id: string | undefined;
}
function ReviewComponent({ id }: IProps) {
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const { data } = useRatingAPI(id);
  const { t } = useTranslation();
  const ratings: IRating[] = data?.data?.data?.Ratings;
  return (
    <>
      {ratings?.length > 0 && (
        <div className="py-5">
          <h2 className="text-2xl font-semibold pb-3" data-aos="fade-left">
            {t("reviews")}
          </h2>
          <div
            data-aos="fade-right"
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20"
          >
            {ratings?.map((rating) => (
              <ReviewCard key={rating?.id} rating={rating} />
            ))}
          </div>
        </div>
      )}
      {/* <Button
          onClick={() => setIsReviewed(true)}
          className="font-semibold text-lg border border-black rounded-md px-6 py-2 hover:bg-gray-100"
        >
          <span>{t("show_all_reviews")}</span>
        </Button> */}
      {isReviewed && (
        <ReviewModal
          isReviewed={isReviewed}
          close={() => setIsReviewed(false)}
        />
      )}
    </>
  );
}

export default ReviewComponent;
