import Button from "./Button";
import { Minus, Plus } from "lucide-react";
interface Iprops {
  counter: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
  width?: string;
  height?: string;
  maxNumber?: number;
  bookGuestCount?: number;
}
function Counter({
  counter,
  increaseCounter,
  decreaseCounter,
  width = "24px",
  height = "24px",
  maxNumber,
  bookGuestCount,
}: Iprops) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button
        disabled={counter === 0 || bookGuestCount === counter}
        onClick={decreaseCounter}
        className="rounded-full bg-white text-black border-2 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ width: width, height: height }}
      >
        <span>
          <Minus size={15} />
        </span>
      </Button>
      <span className="font-medium text-center">{counter}</span>
      <Button
        disabled={counter === maxNumber}
        onClick={increaseCounter}
        className="rounded-full bg-white text-black border-2 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ width: width, height: height }}
      >
        <span>
          <Plus size={15} />
        </span>
      </Button>
    </div>
  );
}
export default Counter;
