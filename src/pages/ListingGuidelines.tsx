import { useListingGuidelinesAPI } from "@/services/conditionService";
import { useTranslation } from "react-i18next";

function ListingGuidelines() {
  const { t } = useTranslation();
  const { data } = useListingGuidelinesAPI();
  return (
    <div className="py-5 min-h-screen">
      <div className="p-5 md:p-10 pt-0 md:pt-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {t("listing_guideLines")}
        </h1>
        <div
          className="mt-4 text-dark"
          dangerouslySetInnerHTML={{
            __html: data?.data?.data?.listing_guidelines,
          }}
        />
      </div>
    </div>
  );
}

export default ListingGuidelines;
