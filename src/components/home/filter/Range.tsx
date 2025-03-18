import Slider from "rc-slider";
import { useTranslation } from "react-i18next";
import PriceSkeleton from "../../skeleton/PriceSkeleton";
interface IProps {
  values: number[];
  handleRangeChange: (newValues: number[]) => void;
}
function PriceRange({ values, handleRangeChange }: IProps) {
  const { t } = useTranslation();
  const histogramData: number[] = [5, 20, 50, 100, 80, 40, 30, 20, 10];
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
      {values.length > 1 && (
        <Slider
          range
          defaultValue={values}
          min={10}
          max={568885}
          value={values}
          onChange={(value) =>
            handleRangeChange(Array.isArray(value) ? value : [value])
          }
          trackStyle={[{ backgroundColor: "#223f7f" }]}
        />
      )}

      <div className="flex font-medium text-dark justify-between mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span>{t("minimum")}</span>:{" "}
          {!values[0] ? (
            <PriceSkeleton />
          ) : (
            <span className="text-black font-medium">{values[0]}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span>{t("maximum")}</span>:
          {!values[1] ? (
            <PriceSkeleton />
          ) : (
            <span className="text-black font-medium">{values[1]}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PriceRange;
