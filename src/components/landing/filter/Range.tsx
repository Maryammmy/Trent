import { Slider } from "@/components/ui/slider";
import { useTranslation } from "react-i18next";

interface IProps {
  values: number[];
  handleRangeChange: (newValues: number[]) => void;
  min: number | undefined;
  max: number | undefined;
}
function Range({ values, handleRangeChange, min, max }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      {/* Slider */}
      {values?.length > 0 && (
        <Slider
          value={values}
          onValueChange={handleRangeChange}
          min={min}
          max={max}
          step={1}
        />
      )}
      <div className="flex flex-wrap gap-2 font-medium text-dark justify-between text-sm">
        {/* Minimum Price */}
        <div className="flex items-center gap-2">
          <span>{t("minimum")}:</span>
          {min === undefined ? (
            <span className="text-black font-medium">
              {t("choose_government_to_continue")}
            </span>
          ) : values?.length > 0 && values[0] ? (
            <span className="text-black font-medium">{values[0]}</span>
          ) : (
            <span className="text-black font-medium">
              {t("no_minimum_price_found")}
            </span>
          )}
        </div>
        {/* Maximum Price */}
        <div className="flex items-center gap-2">
          <span>{t("maximum")}:</span>
          {max === undefined ? (
            <span className="text-black font-medium">
              {t("choose_government_to_continue")}
            </span>
          ) : values?.length > 0 && values[1] ? (
            <span className="text-black font-medium">{values[1]}</span>
          ) : (
            <span className="text-black font-medium">
              {t("no_maximum_price_found")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Range;
