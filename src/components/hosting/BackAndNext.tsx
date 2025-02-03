import { Link } from "react-router-dom";

interface IProps {
  back: string;
  next: string;
}
function BackAndNext({ back, next }: IProps) {
  return (
    <div className="flex items-center justify-between px-5 xl:px-20 pt-5">
      <Link to={back} className="font-medium underline text-lg text-primary">
        <span>Back</span>
      </Link>
      <Link
        to={next}
        className="bg-primary text-white py-2 px-8 rounded-md font-medium text-lg"
      >
        <span>Next</span>
      </Link>
    </div>
  );
}

export default BackAndNext;
