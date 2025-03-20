import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextArea from "../../../components/ui/TextArea";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";

const storedRulesEn = sessionStorage.getItem("guest_rules_en") || "";
const storedRulesAr = sessionStorage.getItem("guest_rules_ar") || "";

function GuestRules() {
  const { t } = useTranslation();
  const [rulesTextAreaEn, setRulesTextAreaEn] = useState<string>(storedRulesEn);
  const [rulesTextAreaAr, setRulesTextAreaAr] = useState<string>(storedRulesAr);

  const handleRulesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    lang: "en" | "ar"
  ) => {
    const newValue = e.target.value;
    if (lang === "en") {
      setRulesTextAreaEn(newValue);
      sessionStorage.setItem("guest_rules_en", newValue);
    } else {
      setRulesTextAreaAr(newValue);
      sessionStorage.setItem("guest_rules_ar", newValue);
    }
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("guest_rules")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("guest_rules_desc")}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">{t("guest_rules_in_english")}</label>
          <TextArea
            maxLength={500}
            minLength={10}
            onChange={(e) => handleRulesChange(e, "en")}
            name="guest_rules_en"
            value={rulesTextAreaEn}
            placeholder={t("guest_rules_placeholder_en")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            rows={5}
          ></TextArea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("guest_rules_in_arabic")}</label>
          <TextArea
            maxLength={500}
            minLength={10}
            onChange={(e) => handleRulesChange(e, "ar")}
            name="guest_rules_ar"
            value={rulesTextAreaAr}
            placeholder={t("guest_rules_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            rows={5}
          ></TextArea>
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "75%"]} />
      <BackAndNext
        back="/become-a-host/price-and-deposit"
        next="/hosting/properties"
        isNextDisabled={
          rulesTextAreaEn.length < 10 || rulesTextAreaAr.length < 10
        }
      />
    </div>
  );
}

export default GuestRules;
