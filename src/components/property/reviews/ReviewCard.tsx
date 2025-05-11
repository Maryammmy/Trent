import { IRating } from "@/interfaces/rating";
import Image from "../../ui/Image";
import Rating from "../../ui/Rating";
import { baseURL } from "@/services";
import { getMonthYearString } from "@/utils/getMonthYearString";
interface IProps {
  rating: IRating;
}
function ReviewCard({ rating }: IProps) {
  const {
    comment,
    rating: ratingValue,
    user_img,
    user_name,
    created_at,
  } = rating;
  return (
    <div>
      <div className="flex items-center gap-5 pb-2">
        <div className="w-14 h-14">
          <Image
            imageUrl={baseURL + user_img}
            alt="User Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">{user_name}</h3>
        </div>
      </div>
      <div className="flex  items-center gap-2">
        <Rating rating={Number(ratingValue)} />
        <p className="font-medium">{getMonthYearString(created_at)}</p>
      </div>
      <p className="max-w-md font-medium">{comment && comment}</p>
    </div>
  );
}
export default ReviewCard;
