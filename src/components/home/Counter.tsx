import Button from "../ui/Button";
import { Minus, Plus } from "lucide-react";
interface Iprops {
  counter: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
}
function Counter({ counter, increaseCounter, decreaseCounter }: Iprops) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Button
        disabled={counter === 0}
        onClick={decreaseCounter}
        className={`w-6 h-6 rounded-full bg-white text-secondary border-2 flex justify-center items-center ${
          counter === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span>
          <Minus size={15} />
        </span>
      </Button>
      <span className="font-medium w-4 text-center">{counter}</span>
      <Button
        onClick={increaseCounter}
        className="w-6 h-6 rounded-full bg-white text-secondary border-2 flex justify-center items-center"
      >
        <span>
          <Plus size={15} />
        </span>
      </Button>
    </div>
  );
}

export default Counter;
