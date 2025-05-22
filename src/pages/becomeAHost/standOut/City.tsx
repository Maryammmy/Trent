import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";
import { IGovernement } from "../../../interfaces";
import Select from "../../../components/ui/Select";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import { useGovernmentsAPI } from "../../../services/filtersService";
import { useTranslateAPI } from "@/services/translateService";

const City = () => {
  const { t } = useTranslation();
  const [cityAr, setCityAr] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const { data } = useGovernmentsAPI();
  const governmentList = data?.data?.data?.government_list;
  const { data: translatedText } = useTranslateAPI(cityAr.trim());
  useEffect(() => {
    setCityAr(sessionStorage.getItem("city_ar") || "");
    setGovernmentId(sessionStorage.getItem("government_id") || "");
  }, []);
  useEffect(() => {
    const translated = translatedText?.data?.responseData?.translatedText;
    if (translated) {
      sessionStorage.setItem("city_en", translated);
    }
  }, [translatedText]);
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const trimmedValue = rawValue.trim();
    setCityAr(rawValue);
    if (trimmedValue.length > 0) {
      sessionStorage.setItem("city_ar", trimmedValue);
    } else {
      sessionStorage.removeItem("city_ar");
    }
  };

  const handleGovernmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGovId = e.target.value;
    setGovernmentId(newGovId);
    sessionStorage.setItem("government_id", newGovId);
  };
  const isNextDisabled = cityAr.trim().length < 2 || !governmentId;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("city_for_property")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("city_for_property_desc")}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium flex items-center">
            {t("government")}
            <span className="text-red-500 ms-1">*</span>
          </label>
          {!governmentList ? (
            <SelectSkeleton />
          ) : governmentList?.length ? (
            <Select
              options={governmentList.map((gov: IGovernement) => ({
                value: gov.id,
                label: gov.name,
              }))}
              value={governmentId}
              onChange={handleGovernmentChange}
              className="bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            />
          ) : (
            <p className="border bg-white py-3 px-2 rounded-md">
              No government found
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium flex items-center">
            {t("city_in_arabic")}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <Input
            name="city_ar"
            type="text"
            maxLength={100}
            minLength={2}
            value={cityAr}
            onChange={handleCityChange}
            placeholder={t("city_for_property_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "66.66%", "0px"]} />
      <BackAndNext
        back="/become-a-host/title"
        next="/become-a-host/compound"
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
};

export default City;
