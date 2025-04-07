import { useHostCancellationPoliciesAPI } from "@/services/conditionService";
import { useTranslation } from "react-i18next";

function HostCancellationPolicy() {
  const { t } = useTranslation();
  const { data } = useHostCancellationPoliciesAPI();
  return (
    <div className="py-5 min-h-screen">
      <div className="p-10 pt-0 md:pt-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {t("host_cancellation_policy")}
        </h1>
        <div
          className="mt-4 text-dark"
          dangerouslySetInnerHTML={{
            __html: data?.data?.data?.host_cancellation_policies,
          }}
        />
      </div>
    </div>
  );
}

export default HostCancellationPolicy;
