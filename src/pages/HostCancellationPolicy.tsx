import { useHostCancellationPoliciesAPI } from "@/services/conditionService";

function HostCancellationPolicy() {
  const { data } = useHostCancellationPoliciesAPI();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.data?.data?.host_cancellation_policies,
      }}
    />
  );
}

export default HostCancellationPolicy;
