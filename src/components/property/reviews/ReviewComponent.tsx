import { useState } from "react";
import { reviewInstruction, widths } from "../../../data/property/review";
// import Button from "../../ui/Button";
import PrograssBar from "../../ui/PrograssBar";
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
        <div className="pb-8 grid gap-4 justify-center grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
          <div className="">
            <h2 className="font-medium">{t("overall_rating")}</h2>
            {widths.map((item, index) => (
              <div key={index} className="max-w-32 flex items-center gap-2">
                <span className="font-medium text-xs">{item.num}</span>
                <PrograssBar
                  height="4px"
                  width={item.width}
                  backgroundColor="black"
                />
              </div>
            ))}
          </div>
          {reviewInstruction.map((item, index) => {
            const { icon, title, rate } = item;
            const translatedTitle = t(title);
            return (
              <div
                key={index}
                className={` flex flex-col justify-between xl:ps-6 xl:border-l`}
              >
                <div>
                  <h2 className="font-medium">{translatedTitle}</h2>
                  <div className="font-medium">{rate}</div>
                </div>
                <span>{icon}</span>
              </div>
            );
          })}
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
      <ReviewModal isReviewed={isReviewed} close={() => setIsReviewed(false)} />
    </>
  );
}

export default ReviewComponent;
