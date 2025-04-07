import { useConfidenceBookingAPI } from "@/services/conditionService";
import { useTranslation } from "react-i18next";

function ConfidenceBooking() {
  const { t } = useTranslation();
  const { data } = useConfidenceBookingAPI();
  return (
    <div className="py-5 min-h-screen">
      <div className="p-5 md:p-10 pt-0 md:pt-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {t("confidence_booking")}
        </h1>
        <div
          className="mt-4 text-dark"
          dangerouslySetInnerHTML={{
            __html: data?.data?.data?.confidence_booking,
          }}
        />
      </div>
    </div>
  );
}

export default ConfidenceBooking;
