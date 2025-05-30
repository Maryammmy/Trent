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
  const { t } = useTranslation();
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const { data } = useRatingAPI(id);
  const ratings: IRating[] = data?.data?.data?.Ratings;
  return (
    <>
      <div className="max-w-7xl mx-auto pb-10">
        <div className="flex flex-col items-center gap-1 pb-10">
          <h2 className="text-[80px] font-bold">4.95</h2>
          <h4 className="text-2xl font-medium">{t("guest_favorite")}</h4>
          <p className="max-w-xs text-center text-dark font-medium">
            {t("guest_favorite_desc")}
          </p>
        </div>
        {ratings?.length > 0 && (
          <div className="border-t py-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            {ratings?.map((rating) => (
              <ReviewCard key={rating?.id} rating={rating} />
            ))}
          </div>
        )}
        {/* <Button
          onClick={() => setIsReviewed(true)}
          className="font-semibold text-lg border border-black rounded-md px-6 py-2 hover:bg-gray-100"
        >
          <span>{t("show_all_reviews")}</span>
        </Button> */}
      </div>
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
