import { useTermsAndConditionsAPI } from "@/services/conditionService";
import { useTranslation } from "react-i18next";

function TermsAndConditions() {
  const { t } = useTranslation();
  const { data } = useTermsAndConditionsAPI();
  return (
    <div className="py-5 min-h-screen">
      <div className="p-6 pt-0 md:pt-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {t("terms_and_conditions")}
        </h1>
        <div
          className="mt-4 text-dark"
          dangerouslySetInnerHTML={{
            __html: data?.data?.data?.terms_and_conditions,
          }}
        />
      </div>
    </div>
  );
}

export default TermsAndConditions;
