import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TextArea from "../../../components/ui/TextArea";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import { useTranslateAPI } from "@/services/translateService";

function Description() {
  const { t } = useTranslation();
  const [descTextAreaEn, setDescTextAreaEn] = useState<string>("");
  const [descTextAreaAr, setDescTextAreaAr] = useState<string>("");
  const { data: translatedText } = useTranslateAPI(descTextAreaAr.trim());
  useEffect(() => {
    setDescTextAreaAr(sessionStorage.getItem("description_ar") || "");
    setDescTextAreaEn(sessionStorage.getItem("description_en") || "");
  }, []);
  useEffect(() => {
    const translated = translatedText?.data?.responseData?.translatedText;
    if (translated) {
      setDescTextAreaEn(translated);
      sessionStorage.setItem("description_en", translated);
    }
  }, [translatedText]);
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    lang: "en" | "ar"
  ) => {
    const rawValue = e.target.value;
    const trimmedValue = rawValue.trim();
    const setter = lang === "en" ? setDescTextAreaEn : setDescTextAreaAr;
    const storageKey = lang === "en" ? "description_en" : "description_ar";

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
          {t("desc_for_property")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("desc_for_property_desc")}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">
            {t("desc_in_arabic")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <TextArea
            maxLength={500}
            minLength={50}
            onChange={(e) => handleDescriptionChange(e, "ar")}
            name="description_ar"
            value={descTextAreaAr}
            placeholder={t("desc_for_property_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            rows={5}
          ></TextArea>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">
            {t("desc_in_english")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <TextArea
            maxLength={500}
            minLength={50}
            onChange={(e) => handleDescriptionChange(e, "en")}
            name="description_en"
            value={descTextAreaEn}
            placeholder={t("desc_for_property_placeholder_en")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            rows={5}
          ></TextArea>
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "55.55%", "0px"]} />
      <BackAndNext
        back="/become-a-host/title"
        next="/become-a-host/city"
        isNextDisabled={
          descTextAreaEn.trim().length < 50 || descTextAreaAr.trim().length < 50
        }
      />
    </div>
  );
}

export default Description;
