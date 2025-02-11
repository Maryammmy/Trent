import { filterButtons } from "../../../data/landingData";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";

interface Props {
  handleClear: () => void;
}

function FilterActions({ handleClear }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between py-2">
      {filterButtons.map((button, index) => (
        <Button
          key={index}
          onClick={button.text === "clear" ? handleClear : undefined}
          className={`text-lg font-medium py-2 px-6 rounded-md ${button.className}`}
        >
          {t(button.text)}
        </Button>
      ))}
    </div>
  );
}

export default FilterActions;
