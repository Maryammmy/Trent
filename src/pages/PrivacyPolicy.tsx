import { usePrivacyPolicyAPI } from "@/services/conditionService";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();
  const { data } = usePrivacyPolicyAPI();
  return (
    <div className="py-5 min-h-screen">
      <div className="p-6 pt-0 md:pt-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {t("privacy_policy")}
        </h1>
        <div
          className="mt-4 text-dark"
          dangerouslySetInnerHTML={{ __html: data?.data?.data?.privacy_policy }} // عرض المحتوى المستلم من الـ API
        />
      </div>
    </div>
  );
}

export default PrivacyPolicy;
