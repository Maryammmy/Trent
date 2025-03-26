import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";

const storedTitleAr = sessionStorage.getItem("title_ar");
const storedTitleEn = sessionStorage.getItem("title_en");
function Title() {
  const { t } = useTranslation();
  const [titleAr, setTitleAr] = useState<string>("");
  const [titleEn, setTitleEn] = useState<string>("");
  useEffect(() => {
    setTitleAr(storedTitleAr || "");
    setTitleEn(storedTitleEn || "");
  }, []);
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
  const isNextDisabled = titleAr.length < 10 || titleEn.length < 10;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("title_for_property")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("title_for_property_desc")}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">{t("title_in_english")}</label>
          <Input
            type="text"
            maxLength={100}
            minLength={10}
            onChange={(e) => handleTitleChange(e, "en")}
            name="title_en"
            value={titleEn}
            placeholder={t("title_for_property_placeholder_en")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">{t("title_in_arabic")}</label>
          <Input
            type="text"
            maxLength={100}
            minLength={10}
            onChange={(e) => handleTitleChange(e, "ar")}
            name="title_ar"
            value={titleAr}
            placeholder={t("title_for_property_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "44.44%", "0px"]} />
      <BackAndNext
        back="/become-a-host/images"
        next="/become-a-host/description"
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}

export default Title;
