import Image from "../../ui/Image";
import { useTranslation } from "react-i18next";
import { IBooking } from "@/interfaces/booking";
import { baseURL } from "@/services";
interface IProps {
  bookingData: IBooking;
}
function PriceDetails({ bookingData }: IProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="border p-5 w-full rounded-lg md:w-[500px]">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="relative w-28 h-28 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]"></div>
            <div className="w-full h-full">
              <Image
                imageUrl={baseURL + bookingData?.image_list?.[0]?.img}
                alt="property"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="max-w-56 text-lg font-semibold">
              {bookingData?.prop_title}
            </h4>
          </div>
        </div>
        <div className="pt-4">
          <h4 className="text-lg lg:text-xl font-semibold">
            {t("price_details")}
          </h4>
          <div className="my-2 py-2 font-medium border-b">
            <div className="grid grid-cols-2 gap-5 mb-2">
              <span>{`${t("duration")} (${
                Number(bookingData?.total_day) > 1 ? t("nights") : t("night")
              })`}</span>
              <span className="text-end">
                {bookingData?.total_paid} {t("EGP")}
              </span>
            </div>
          </div>
          <div className="my-2 py-2 font-medium border-b">
            <div className="grid grid-cols-2 gap-5 mb-2">
              <span>{t("paid")}</span>
              <span className="text-end">
                {bookingData?.partial_value} {t("EGP")}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 font-semibold text-lg pt-3">
            <span>{t("remaining")}</span>
            <span className="text-end">
              {bookingData?.reminder_value} {t("EGP")}
            </span>
          </div>
          <div>
            <p className="font-medium pt-1">
              {t("payment_confirmation", {
                partial_value: bookingData?.partial_value,
                reminder_value: bookingData?.reminder_value,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
