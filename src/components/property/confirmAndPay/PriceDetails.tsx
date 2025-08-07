import Image from "../../ui/Image";
import { useTranslation } from "react-i18next";
import { ICoupon, IVerifyPropertyResponse } from "@/interfaces/booking";
import { baseURL } from "@/services";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { checkCouponAPI } from "@/services/bookingService";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { defaultCouponResponse } from "@/utils/defaultValues";
import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useQueryParam } from "@/utils/getQueryParam";
interface IProps {
  bookingData: IVerifyPropertyResponse;
  couponResponse: ICoupon;
  handleChangeCouponResponse: (data: ICoupon) => void;
}
function PriceDetails({
  bookingData,
  couponResponse,
  handleChangeCouponResponse,
}: IProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const couponFromUrl = useQueryParam("coupon");
  const couponFromStateOrUrl = location?.state?.coupon || couponFromUrl;
  const [coupon, setCoupon] = useState(couponFromStateOrUrl || "");
  useEffect(() => {
    if (couponResponse?.coupon) {
      setCoupon(couponResponse?.coupon);
    }
  }, [couponResponse?.coupon]);
  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const response = await checkCouponAPI(
        coupon,
        bookingData?.item_id.toString(),
        bookingData?.sub_total
      );
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        sessionStorage.setItem(
          "couponResponse",
          JSON.stringify({ ...response?.data?.data, coupon: coupon })
        );
        handleChangeCouponResponse({ ...response?.data?.data, coupon: coupon });
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveCoupon = () => {
    setCoupon("");
    handleChangeCouponResponse(defaultCouponResponse);
    sessionStorage.removeItem("couponResponse");
  };
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
              {bookingData?.title}
            </h4>
          </div>
        </div>
        <div className="pt-4">
          <h4 className="text-lg lg:text-xl font-semibold pb-4">
            {t("coupon")}
          </h4>
          <div className="p-3 border rounded-lg flex gap-2 justify-between items-center relative focus-within:border-primary">
            <Input
              readOnly={!!couponResponse?.coupon_value}
              value={coupon}
              placeholder={t("enter_coupon_code")}
              className="outline-none flex-1 min-w-0 disabled:bg-transparent"
              onChange={(e) => setCoupon(e.target.value)}
            />
            {couponResponse?.coupon_value && (
              <span className="flex justify-center items-center rounded-full w-5 h-5 bg-green-600 absolute left-28">
                <Check className="text-white" />
              </span>
            )}
            <Button
              disabled={loading || !coupon}
              className={`font-semibold ${
                couponResponse?.coupon_value ? "text-red-600" : "text-primary"
              }`}
              onClick={
                couponResponse?.coupon_value
                  ? handleRemoveCoupon
                  : handleApplyCoupon
              }
            >
              {loading ? (
                <Loader borderColor="#223f7f" />
              ) : couponResponse.coupon_value ? (
                t("remove")
              ) : (
                t("apply")
              )}
            </Button>
          </div>
        </div>
        <div className="pt-4">
          <h4 className="text-lg lg:text-xl font-semibold">
            {t("price_details")}
          </h4>
          <div className="my-2 py-2 font-medium border-b">
            <div className="grid grid-cols-2 gap-5 mb-2">
              <span>{`${t("duration")} (${
                bookingData?.days > 1 ? t("nights") : t("night")
              })`}</span>
              <span className="text-end">
                {bookingData?.sub_total} {t("EGP")}
              </span>
            </div>
          </div>
          <div className="my-2 py-2 font-medium border-b">
            <div className="grid grid-cols-2 gap-5 mb-2">
              <span>
                {t("vat")} <span>({bookingData?.tax_percent}%)</span>
              </span>
              <span className="text-end">
                {bookingData?.taxes} {t("EGP")}
              </span>
            </div>
          </div>
          <div className="my-2 py-2 font-medium border-b">
            <div className="grid grid-cols-2 gap-5 mb-2">
              <span>{t("security_deposit_2")}</span>
              <span className="text-end">
                {bookingData?.deposit_fees} {t("EGP")}
              </span>
            </div>
          </div>
          <div className="my-2 py-2 font-medium border-b">
            <div className="grid grid-cols-2 gap-5 mb-2">
              <span>{t("digital_payment_Fees")}</span>
              <span className="text-end">
                {bookingData?.service_fees} {t("EGP")}
              </span>
            </div>
          </div>
          {couponResponse?.coupon_value && (
            <>
              <div className="my-2 py-2 font-medium border-b">
                <div className="grid grid-cols-2 gap-5 mb-2">
                  <span>{t("total_before_discount")}</span>
                  <span className="text-end">
                    {bookingData?.final_total} {t("EGP")}
                  </span>
                </div>
              </div>
              <div className="my-2 py-2 font-medium border-b">
                <div className="grid grid-cols-2 gap-5 mb-2">
                  <span>{t("coupon_discount")}</span>
                  <span className="text-end text-green-600">
                    - {couponResponse?.coupon_value} {t("EGP")}
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="grid grid-cols-2 gap-5 font-semibold text-lg pt-3">
            <span>{t("total")}</span>
            <span className="text-end">
              {couponResponse?.final_total
                ? couponResponse?.final_total
                : bookingData?.final_total}
              {t("EGP")}
            </span>
          </div>
          <div>
            <p className="font-medium pt-1">
              {t("payment_info", {
                partial_value: couponResponse?.partial_value
                  ? couponResponse?.partial_value
                  : bookingData?.partial_value,
                reminder_value: couponResponse?.reminder_value
                  ? couponResponse?.reminder_value
                  : bookingData?.reminder_value,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
