import { useGuestTermsAPI } from "@/services/conditionService";
import { useTranslation } from "react-i18next";

function GuestTerms() {
  const { t } = useTranslation();
  const { data } = useGuestTermsAPI();
  return (
    <div className="py-5">
      <div className="p-5 md:p-10 pt-0 md:pt-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {t("guest_terms")}
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

export default GuestTerms;
