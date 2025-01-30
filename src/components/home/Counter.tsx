import { useState } from "react";
import Button from "../ui/Button";
import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

function Counter() {
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2 text-sm">
      <p className="text-secondary w-[90px] text-start">
        {counter === 0
          ? t("add_guests")
          : counter === 1
          ? `${counter} ${t("guest")}`
          : `${counter} ${t("guests")}`}
      </p>
      <Button
        disabled={counter === 0}
        onClick={() => setCounter(counter - 1)}
        className={`w-6 h-6 rounded-full bg-white text-secondary border-2 flex justify-center items-center ${
          counter === 0 ? "opacity-50" : ""
        }`}
      >
        <span>
          <Minus size={15} />
        </span>
      </Button>
      <span className="font-medium">{counter}</span>
      <Button
        onClick={() => setCounter(counter + 1)}
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
