import Image from "../../ui/Image";
import { useTranslation } from "react-i18next";
import { IVerifyPropertyResponse } from "@/interfaces/booking";
import { baseURL } from "@/services";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { checkCouponAPI } from "@/services/bookingService";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
interface IProps {
  bookingData: IVerifyPropertyResponse;
  couponValue: number;
  handleChangeCouponValue: (val: number) => void;
  finalTotalAfterDiscount: number;
}
function PriceDetails({
  bookingData,
  couponValue,
  handleChangeCouponValue,
  finalTotalAfterDiscount,
}: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const response = await checkCouponAPI(coupon, bookingData?.sub_total);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        handleChangeCouponValue(Number(response?.data?.data?.value));
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveCoupon = () => {
    setCoupon("");
    handleChangeCouponValue(0);
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
          <div className="p-3 border rounded-lg flex gap-2 justify-between focus-within:border-primary">
            <Input
              value={coupon}
              placeholder={t("enter_coupon_code")}
              className="flex-1 min-w-0 outline-none"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button
              disabled={loading || !coupon}
              className="font-semibold text-primary"
              onClick={couponValue ? handleRemoveCoupon : handleApplyCoupon}
            >
              {loading ? (
                <Loader borderColor="#223f7f" />
              ) : couponValue ? (
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
              <span>{`${t("duration")} (${bookingData?.days} ${
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
          {couponValue > 0 && (
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
                  <span className="text-end">
                    - {couponValue?.toFixed(2)} {t("EGP")}
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="grid grid-cols-2 gap-5 font-semibold text-lg pt-3">
            <span>{t("total")}</span>
            <span className="text-end">
              {finalTotalAfterDiscount?.toFixed(2)} {t("EGP")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
