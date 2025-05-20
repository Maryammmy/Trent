import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
interface IProps {
  rating: number;
  handleRatingChange: (newRating: number) => void;
}
const RatingFilter = ({ rating, handleRatingChange }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-bold">{t("rating")}</h3>
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        starHoverColor="orange"
        starEmptyColor="rgb(214 211 209)"
        changeRating={handleRatingChange}
        numberOfStars={5}
        starDimension="30px"
        starSpacing="5px"
      />
    </div>
  );
};

export default RatingFilter;
