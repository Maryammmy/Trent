import Button from "./Button";
import { Minus, Plus } from "lucide-react";
interface Iprops {
  width?: string;
  height?: string;
  counter: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
}
function Counter({
  width = "24px",
  height = "24px",
  counter,
  increaseCounter,
  decreaseCounter,
}: Iprops) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button
        disabled={counter === 0}
        onClick={decreaseCounter}
        className={`rounded-full bg-white text-black border-2 flex justify-center items-center ${
          counter === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ width: width, height: height }}
      >
        <span>
          <Minus size={15} />
        </span>
      </Button>
      <span className="font-medium text-center">{counter}</span>
      <Button
        onClick={increaseCounter}
        className="rounded-full bg-white text-black border-2 flex justify-center items-center"
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
