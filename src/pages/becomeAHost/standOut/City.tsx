import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";
import { useGetData } from "../../../hooks/useGetData";
import { IGovernement } from "../../../interfaces";
import Select from "../../../components/ui/Select";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";

const currentLanguage = localStorage.getItem("i18nextLng");
const storedCityAr = sessionStorage.getItem("city_ar") || "";
const storedCityEn = sessionStorage.getItem("city_en") || "";
const storedGovId = sessionStorage.getItem("government") || "";
const City = () => {
  const { t } = useTranslation();
  const [cityAr, setCityAr] = useState(storedCityAr);
  const [cityEn, setCityEn] = useState(storedCityEn);
  const [governmentId, setGovernmentId] = useState(storedGovId);

  const { data } = useGetData(
    ["governmentList"],
    `user_api/u_government.php?lang=${currentLanguage}`
  );
  const governmentList = useMemo(() => data?.data?.governmentlist, [data]);
  useEffect(() => {
    if (governmentList?.length === 1) {
      setGovernmentId(governmentList?.[0].id);
    }
  }, [governmentList]);
  const handleCityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: "en" | "ar"
  ) => {
    const newValue = e.target.value;
    if (lang === "en") {
      setCityEn(newValue);
      sessionStorage.setItem("city_en", newValue);
    } else {
      setCityAr(newValue);
      sessionStorage.setItem("city_ar", newValue);
    }
  };
  const handleGovernmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGovId = e.target.value;
    setGovernmentId(newGovId);
    sessionStorage.setItem("government", newGovId);
  };
  const isNextDisabled =
    cityAr.length < 2 || cityEn.length < 2 || !governmentId;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("city_for_property")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("city_for_property_desc")}
        </p>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("government")}</label>
          {!governmentList ? (
            <SelectSkeleton />
          ) : governmentList.length > 1 ? (
            <Select
              options={governmentList.map((gov: IGovernement) => ({
                value: gov.id,
                label: gov.name,
              }))}
              onChange={handleGovernmentChange}
              className="bg-zinc-50 border border-dark py-3 px-2 rounded-md"
            />
          ) : (
            <p className="bg-zinc-50 border border-dark py-3 px-2 rounded-md">
              {governmentList[0]?.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium mb-1">{t("city_in_english")}</label>
          <Input
            name="city_en"
            type="text"
            maxLength={100}
            minLength={2}
            value={cityEn}
            onChange={(e) => handleCityChange(e, "en")}
            placeholder={t("city_for_property_placeholder_en")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("city_in_arabic")}</label>
          <Input
            name="city_ar"
            type="text"
            maxLength={100}
            minLength={2}
            value={cityAr}
            onChange={(e) => handleCityChange(e, "ar")}
            placeholder={t("city_for_property_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary"
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
