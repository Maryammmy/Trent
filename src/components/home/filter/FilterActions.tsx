import { filterButtons } from "../../../data/landingData";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";

interface Props {
  handleClear: () => void;
  close: () => void;
  selectedPlace: string;
  selectedAmenities: string[];
  selectedProperty: string;
  values: number[];
}

function FilterActions({ handleClear }: Props) {
  const { t } = useTranslation();
  // const [enabled, setEnabled] = useState(false);

  // const { data } = useGetData(
  //   ["propertyList"],
  //   `user_api/u_property_list.php?lang=en`,
  //   enabled
  // );

  // const handleApply = () => {
  //   setEnabled(true); // 🔥 تشغيل الجلب عند الضغط على الزر
  //   console.log(data);
  //   close();
  // };
  // console.log(enabled);
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
