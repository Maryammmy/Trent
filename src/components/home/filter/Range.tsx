import Slider from "rc-slider";
import { useTranslation } from "react-i18next";
interface IProps {
  values: number[];
  handleRangeChange: (newValues: number[]) => void;
}
function PriceRange({ values, handleRangeChange }: IProps) {
  const { t } = useTranslation();
  const histogramData = [5, 20, 50, 100, 80, 40, 30, 20, 10];
  return (
    <div>
      <div className="relative h-32 flex justify-center items-end gap-1">
        {histogramData.map((value, index) => (
          <div
            key={index}
            className="bg-primary"
            style={{
              width: "4%",
              height: `${value}%`,
              borderRadius: "2px",
            }}
          ></div>
        ))}
      </div>
      <Slider
        range
        min={500}
        max={50000}
        defaultValue={values}
        onChange={(value) =>
          handleRangeChange(Array.isArray(value) ? value : [value])
        }
        trackStyle={[{ backgroundColor: "#223f7f" }]}
      />
      <div className="flex font-medium text-dark justify-between mt-4 text-sm">
        <span>
          {t("minimum")}:{" "}
          <span className="text-black font-semibold">{values[0]}</span>
        </span>
        <span>
          {t("maximum")}:{" "}
          <span className="text-black font-medium">{values[1]}</span>
        </span>
      </div>
    </div>
  );
}

export default PriceRange;
