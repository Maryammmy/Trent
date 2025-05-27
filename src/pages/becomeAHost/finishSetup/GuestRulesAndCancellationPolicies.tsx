import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TextArea from "../../../components/ui/TextArea";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import CancellationPolicy from "../../../components/becomeAHost/CancellationPolicies";
import { ICancellationPolicy } from "@/interfaces/property";
import { useTranslateAPI } from "@/services/translateService";

function GuestRulesAndCancellationPolicies() {
  const { t } = useTranslation();
  const [rulesTextAreaAr, setRulesTextAreaAr] = useState<string>("");
  const [selectedPolicy, setSelectedPolicy] = useState<
    ICancellationPolicy | ""
  >("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: translatedText } = useTranslateAPI(rulesTextAreaAr.trim());
  useEffect(() => {
    setRulesTextAreaAr(sessionStorage.getItem("guest_rules_ar") || "");
    setSelectedPolicy(
      sessionStorage.getItem("cancellation_policy")
        ? JSON.parse(sessionStorage.getItem("cancellation_policy") || '""')
        : ""
    );
  }, []);
  useEffect(() => {
    const translated = translatedText?.data?.responseData?.translatedText;
    if (translated) {
      sessionStorage.setItem("guest_rules_en", translated || rulesTextAreaAr);
    }
  }, [translatedText, rulesTextAreaAr]);
  const handleRulesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    const trimmedValue = rawValue.trim();
    setRulesTextAreaAr(rawValue);
    if (trimmedValue.length > 0) {
      sessionStorage.setItem("guest_rules_ar", trimmedValue);
    } else {
      sessionStorage.removeItem("guest_rules_ar");
    }
  };

  const handleIClick = () => setIsOpen(!isOpen);
  const handleChangePolicy = (policy: ICancellationPolicy) => {
    setSelectedPolicy(policy);
    setIsOpen(false);
    sessionStorage.setItem("cancellation_policy", JSON.stringify(policy));
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-4">
          {t("guest_rules_and_cancellation_policies")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("guest_rules_and_cancellation_policies_desc")}
        </p>
        <CancellationPolicy
          selectedPolicy={selectedPolicy}
          isOpen={isOpen}
          handleOnClick={handleIClick}
          handleChangePolicy={handleChangePolicy}
        />
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">
            {t("guest_rules_in_arabic")}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <TextArea
            maxLength={500}
            minLength={10}
            onChange={handleRulesChange}
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
        isNextDisabled={rulesTextAreaAr.trim().length < 10 || !selectedPolicy}
      />
    </div>
  );
}

export default GuestRulesAndCancellationPolicies;
