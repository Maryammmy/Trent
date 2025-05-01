import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";
import { useTranslateAPI } from "@/services/translateService";

function Compound() {
  const { t } = useTranslation();
  const [compoundAr, setCompoundAr] = useState<string>("");
  const [compoundEn, setCompoundEn] = useState<string>("");
  const { data: translatedText } = useTranslateAPI(compoundAr.trim());
  useEffect(() => {
    setCompoundAr(sessionStorage.getItem("compound_ar") || "");
    setCompoundEn(sessionStorage.getItem("compound_en") || "");
  }, []);
  useEffect(() => {
    const translated = translatedText?.data?.responseData?.translatedText;
    if (translated) {
      setCompoundEn(translated);
      sessionStorage.setItem("compound_en", translated);
    }
  }, [translatedText]);
  const handleCompoundChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: "en" | "ar"
  ) => {
    const rawValue = e.target.value;
    const trimmedValue = rawValue.trim();
    const setter = lang === "en" ? setCompoundEn : setCompoundAr;
    const storageKey = lang === "en" ? "compound_en" : "compound_ar";
    setter(rawValue);
    if (trimmedValue.length > 0) {
      sessionStorage.setItem(storageKey, trimmedValue);
    } else {
      sessionStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("compound_name_for_property")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("compound_name_for_property_desc")}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">{t("compound_in_arabic")}</label>
          <Input
            maxLength={100}
            minLength={2}
            onChange={(e) => handleCompoundChange(e, "ar")}
            name="compound_name_ar"
            value={compoundAr}
            placeholder={t("compound_name_for_property_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">{t("compound_in_english")}</label>
          <Input
            maxLength={100}
            minLength={2}
            onChange={(e) => handleCompoundChange(e, "en")}
            name="compound_name_en"
            value={compoundEn}
            placeholder={t("compound_name_for_property_placeholder_en")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "77.77%", "0px"]} />
      <BackAndNext
        back="/become-a-host/city"
        next="/become-a-host/address-and-floor"
      />
    </div>
  );
}

export default Compound;
