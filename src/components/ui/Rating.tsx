import { FaStar } from "react-icons/fa";
interface IProps {
  rating: number;
}
const Rating = ({ rating }: IProps) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "text-yellow-500" : "text-gray-300"}
          size={15}
        />
      ))}
    </div>
  );
};

export default Rating;
