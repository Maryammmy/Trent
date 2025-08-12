import { usePrivacyPolicyAPI } from "@/services/conditionService";

function PrivacyPolicy() {
  const { data } = usePrivacyPolicyAPI();
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data?.data?.data?.privacy_policy }}
    />
  );
}

export default PrivacyPolicy;
