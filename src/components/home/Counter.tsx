import { useState } from "react";
import Button from "../ui/Button";
import { Minus, Plus } from "lucide-react";

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <Button
        disabled={counter === 0}
        onClick={() => setCounter(counter - 1)}
        className={`w-6 h-6 rounded-full bg-white text-secondary border-2 flex justify-center items-center ${
          counter === 0 ? "opacity-50" : ""
        }`}
      >
        <Minus size={15} />
      </Button>
      <span className="text-xl font-medium">{counter}</span>
      <Button
        onClick={() => setCounter(counter + 1)}
        className="w-6 h-6 rounded-full bg-white text-secondary border-2 flex justify-center items-center"
      >
        <Plus size={15} />
      </Button>
    </div>
  );
}

export default Counter;
