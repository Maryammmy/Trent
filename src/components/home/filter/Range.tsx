import PriceSkeleton from "@/components/skeleton/PriceSkeleton";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "react-i18next";

interface IProps {
  values: number[];
  handleRangeChange: (newValues: number[]) => void;
  min: number;
  max: number;
}
function Range({ values, handleRangeChange, min, max }: IProps) {
  const { t } = useTranslation();
  return (
    <div>
      {/* Slider */}
      <Slider
        value={values}
        onValueChange={handleRangeChange}
        min={min}
        max={max}
        step={1}
      />
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row mt-2 font-medium text-dark justify-between text-sm">
        {/* Minimum Price */}
        <div className="flex items-center gap-2">
          <span>{t("minimum")}:</span>
          {values?.length ? (
            values[0] === 0 || values[0] ? (
              <span className="text-black font-medium">{values[0]}</span>
            ) : (
              <PriceSkeleton />
            )
          ) : (
            <span>No min price found</span>
          )}
        </div>

        {/* Maximum Price */}
        <div className="flex items-center gap-2">
          <span>{t("maximum")}:</span>
          {values.length ? (
            values[1] === 0 || values[1] ? (
              <span className="text-black font-medium">{values[1]}</span>
            ) : (
              <PriceSkeleton />
            )
          ) : (
            <span>No max price found</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Range;
