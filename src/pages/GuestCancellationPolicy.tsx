import { useGuestCancellationPoliciesAPI } from "@/services/conditionService";
function GuestCancellationPolicy() {
  const { data } = useGuestCancellationPoliciesAPI();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.data?.data?.cancellation_policies,
      }}
    />
  );
}

export default GuestCancellationPolicy;
