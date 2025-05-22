import { Fragment, useEffect, useState } from "react";
import Counter from "../../../components/ui/Counter";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import { floorPlan } from "../../../data/becomeAHost";
import Input from "../../../components/ui/Input";
import InputErrorMessage from "@/components/ui/InputErrorMessage";

function FloorPlan() {
  const backButton = "/become-a-host/property-type";
  const { t } = useTranslation();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [floorPlanCounters, setFloorPlanCounters] = useState<{
    [key: string]: number;
  }>({});
  const [sqft, setSqft] = useState<number | "">("");

  useEffect(() => {
    const storedCounters = floorPlan.reduce((acc, key) => {
      acc[key] = sessionStorage.getItem(key)
        ? JSON.parse(sessionStorage.getItem(key)!)
        : 0;
      return acc;
    }, {} as { [key: string]: number });
    const storedSqft = sessionStorage.getItem("sqft")
      ? JSON.parse(sessionStorage.getItem("sqft") || '""')
      : "";
    setFloorPlanCounters(storedCounters);
    setSqft(storedSqft);
  }, []);
  useEffect(() => {
    if (floorPlanCounters["guest_count"] === 0) {
      sessionStorage.setItem("guest_count", JSON.stringify(0));
    }
  }, [floorPlanCounters]);
  const validate = (
    type: "beds_count" | "bathrooms_count" | "sqft",
    value: number
  ) => {
    const newErrors = { ...errors };
    if (type === "beds_count" || type === "bathrooms_count") {
      if (value < 1 || value > 20) {
        newErrors[type] = t("error_out_of_range_beds_bathrooms");
      } else {
        delete newErrors[type];
      }
    }
    if (type === "sqft") {
      if ((value && value < 5) || value > 2000) {
        newErrors[type] = t("error_out_of_range_sqft");
      } else {
        delete newErrors[type];
      }
    }
    setErrors(newErrors);
  };
  const updateFloorPlanCounter = (key: string, value: number) => {
    setFloorPlanCounters((prev) => {
      const updatedValue = Math.max(0, prev[key] + value);
      sessionStorage.setItem(key, JSON.stringify(updatedValue));
      validate(key as "beds_count" | "bathrooms_count", updatedValue);
      return { ...prev, [key]: updatedValue };
    });
  };
  const handleSqftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const numericValue = Number(inputValue);
    setSqft(numericValue);
    validate("sqft", numericValue);
    sessionStorage.setItem("sqft", JSON.stringify(numericValue));
  };
  const isNextDisabled =
    Object.entries(floorPlanCounters).some(
      ([key, value]) => key !== "guest_count" && value === 0
    ) ||
    !sqft ||
    Object.keys(errors).length > 0;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("floor_plan")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("floor_plan_desc")}
        </p>
        {floorPlan.map((item, index) => (
          <Fragment key={index}>
            <div className="flex border-b min-h-20 mb-2 justify-between items-center">
              <div className="font-medium text-lg">
                <span> {t(item)}</span>
                {item !== "guest_count" && (
                  <span className="text-red-500 ms-1">*</span>
                )}
              </div>
              <Counter
                width="30px"
                height="30px"
                counter={floorPlanCounters[item] ?? 0}
                increaseCounter={() => updateFloorPlanCounter(item, 1)}
                decreaseCounter={() => updateFloorPlanCounter(item, -1)}
              />
            </div>
            {errors[item] && <InputErrorMessage msg={errors[item]} />}
          </Fragment>
        ))}
        <div className="flex flex-col gap-2 mt-5">
          <label className="font-medium flex items-center">
            {t("property_sqft")}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <Input
            name="sqft"
            type="text"
            value={sqft || ""}
            onChange={handleSqftChange}
            className="outline-none border py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            placeholder={t("enter_property_sqft_placeholder")}
          />
          {errors.sqft && <InputErrorMessage msg={errors.sqft} />}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["50%", "0px", "0px"]} />
      <BackAndNext
        back={backButton}
        next="/become-a-host/location"
        isNextDisabled={isNextDisabled}
        allowNext={backButton}
      />
    </div>
  );
}

export default FloorPlan;
