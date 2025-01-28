import { review } from "../../../data/property/review";
import Image from "../../ui/Image";
import Rating from "../../ui/Rating";

function ReviewCard() {
  const { image, name, duration, rating, when, text } = review;
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="w-14 h-14">
          <Image
            imageUrl={image}
            alt="User Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm">{duration}</p>
        </div>
      </div>
      <div className="flex  items-center gap-2">
        <Rating rating={rating} />
        <p className="font-medium">{when}</p>
      </div>
      <p className="max-w-md font-medium">{text}</p>
    </div>
  );
}
export default ReviewCard;
