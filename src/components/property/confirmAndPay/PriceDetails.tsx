import Image from "../../ui/Image";
import { useTranslation } from "react-i18next";
import { IVerifyPropertyResponse } from "@/interfaces/booking";
import { baseURL } from "@/services";
interface IProps {
  bookingData: IVerifyPropertyResponse;
}
function PriceDetails({ bookingData }: IProps) {
  const { t } = useTranslation();

  return (
    <div className="border p-5 w-full rounded-lg md:w-[500px]">
      <div className="flex flex-col md:flex-row gap-5 border-b pb-6">
        <div className="w-28 h-28 rounded-lg overflow-hidden">
          <Image
            imageUrl={baseURL + bookingData?.image_list?.[0]?.img}
            alt="property"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="max-w-56 text-lg font-semibold">
            {bookingData?.title}
          </h4>
        </div>
      </div>
      <div className="pt-4">
        <h4 className="text-lg lg:text-xl font-semibold">
          {t("price_details")}
        </h4>
        <div className="my-2 py-2 font-medium border-b">
          <div className="grid grid-cols-2 gap-5 mb-2">
            <span>{`${t("duration")} (${bookingData?.days}${t("days")})`}</span>
            <span className="text-end">
              {Math.round(bookingData?.sub_total)}
              {t("price_per_night")}
            </span>
          </div>
        </div>
        <div className="my-2 py-2 font-medium border-b">
          <div className="grid grid-cols-2 gap-5 mb-2">
            <span>{`${t("taxes")} (${bookingData?.tax_percent}%)`} </span>
            <span className="text-end">
              {Math.round(bookingData?.taxes)}
              {t("price_per_night")}
            </span>
          </div>
        </div>
        <div className="my-2 py-2 font-medium border-b">
          <div className="grid grid-cols-2 gap-5 mb-2">
            <span>{t("deposit_fees")}</span>
            <span className="text-end">
              {parseInt(bookingData?.deposit_fees)}
              {t("price_per_night")}
            </span>
          </div>
        </div>
        <div className="my-2 py-2 font-medium border-b">
          <div className="grid grid-cols-2 gap-5 mb-2">
            <span>{t("service_fees")}</span>
            <span className="text-end">
              {Math.round(bookingData?.service_fees)}
              {t("price_per_night")}
            </span>
          </div>
        </div>
        <div className="my-2 py-2 font-medium border-b">
          <div className="grid grid-cols-2 gap-5 mb-2">
            <span>{t("trent_fees")}</span>
            <span className="text-end">
              {Math.round(bookingData?.trent_fees)}
              {t("price_per_night")}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 font-semibold text-lg pt-3">
          <span>
            {t("total")} ({t("price_per_night")})
          </span>
          <span className="text-end">
            {Math.round(bookingData?.final_total)}
            {t("price_per_night")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
