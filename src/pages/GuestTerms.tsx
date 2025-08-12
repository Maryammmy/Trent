import { useGuestTermsAPI } from "@/services/conditionService";

function GuestTerms() {
  const { data } = useGuestTermsAPI();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.data?.data?.terms_and_conditions,
      }}
    />
  );
}

export default GuestTerms;
