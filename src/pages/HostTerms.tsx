import { useHostTermsAPI } from "@/services/conditionService";

function HostTerms() {
  const { data } = useHostTermsAPI();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.data?.data?.host_terms_and_conditions,
      }}
    />
  );
}

export default HostTerms;
