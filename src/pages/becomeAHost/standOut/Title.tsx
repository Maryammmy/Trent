import { useTranslation } from "react-i18next";
import { useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";

const storedTitleAr = sessionStorage.getItem("title_ar") || "";
const storedTitleEn = sessionStorage.getItem("title_en") || "";

function Title() {
  const { t } = useTranslation();
  const [titleAr, setTitleAr] = useState<string>(storedTitleAr);
  const [titleEn, setTitleEn] = useState<string>(storedTitleEn);
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: "en" | "ar"
  ) => {
    const newValue = e.target.value;
    if (lang === "en") {
      setTitleEn(newValue);
      sessionStorage.setItem("title_en", newValue);
    } else {
      setTitleAr(newValue);
      sessionStorage.setItem("title_ar", newValue);
    }
  };
  const isNextDisabled = titleAr.length < 5 || titleEn.length < 5;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("title_for_property")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("title_for_property_desc")}
        </p>
        <label className="font-medium mb-1">{t("title_in_english")}</label>
        <Input
          maxLength={100}
          minLength={5}
          onChange={(e) => handleTitleChange(e, "en")}
          name="title_en"
          value={titleEn}
          placeholder={t("title_for_property_placeholder_en")}
          className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary mb-5"
        />
        <label className="font-medium mb-1">{t("title_in_arabic")}</label>
        <Input
          maxLength={100}
          minLength={5}
          onChange={(e) => handleTitleChange(e, "ar")}
          name="title_ar"
          value={titleAr}
          placeholder={t("title_for_property_placeholder_ar")}
          className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary"
        />
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "60%", "0px"]} />
      <BackAndNext
        back="/become-a-host/images"
        next="/become-a-host/description"
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}

export default Title;
