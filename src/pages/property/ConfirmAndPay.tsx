import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import PriceDetails from "../../components/property/confirmAndPay/PriceDetails";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import { IVerifyPropertyResponse } from "@/interfaces/booking";
import { useCallback, useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import {
  initFawryPaymentAPI,
  useFawryCredentialsAPI,
} from "@/services/fawryService";
import { generateFawryPaymentInitData } from "@/utils/generateFawryPaymentData";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { AxiosError } from "axios";
import { useQueryParam } from "@/utils/getQueryParam";
import PaymentStatus from "@/components/property/confirmAndPay/PaymentStatus";
import { CurrentLanguage } from "@/types";
import PaymentMethodSelector from "@/components/property/confirmAndPay/PaymentMethodSelector";
import Cookies from "js-cookie";
import { paymentStatusAPI, saveBookingAPI } from "@/services/bookingService";
import { ApiError } from "@/interfaces";
import SuccessBookingModal from "@/components/property/confirmAndPay/SuccessBookingModal";
import CardPaymentStatus from "@/components/property/confirmAndPay/CardPaymentStatus";
import { updateQueryParamInURL } from "@/utils/updateQueryParamInURL";

const uid = Cookies.get("user_id");
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function ConfirmAndPay() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const { id } = useParams();
  const returnUrl = `${window.location.origin}/properties/${id}/confirm-and-pay`;
  const bookingData: IVerifyPropertyResponse =
    location?.state?.data ||
    JSON.parse(sessionStorage.getItem("bookingData") || "null");
  const { data } = useFawryCredentialsAPI();
  const fawryCredentials = data?.data?.data?.fawry_credentials;
  const referenceNumber = useQueryParam("referenceNumber");
  const orderStatusFromUrl = useQueryParam("orderStatus");
  const paymentAmount = useQueryParam("paymentAmount");
  const paymentMethodFromUrl = useQueryParam("paymentMethod");
  const statusCode = useQueryParam("statusCode");
  const statusDescription = useQueryParam("statusDescription");
  const merchantRefNumber = useQueryParam("merchantRefNumber") || "";
  const [isSuccessModal, setIsSuccessModal] = useState(true);
  const [saveBookingResponse, setSaveBookingResponse] = useState(null);
  const [orderStatus, setOrderStatus] = useState(orderStatusFromUrl);
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodFromUrl === "PayUsingCC" ||
      statusDescription?.toLowerCase().includes("card")
      ? "CARD"
      : paymentMethodFromUrl === "PayAtFawry"
      ? "PayAtFawry"
      : "MWALLET"
  );
  const itemId = bookingData?.item_id ? bookingData.item_id.toString() : "";
  const createFawryPayment = async () => {
    try {
      if (!paymentMethod) {
        toast.error(t("select_payment_method"));
        return;
      }
      setLoading(true);
      const paymentData = generateFawryPaymentInitData(
        fawryCredentials?.merchant_code,
        fawryCredentials?.secure_key,
        itemId,
        bookingData?.final_total,
        paymentMethod,
        returnUrl
      );
      const response = await initFawryPaymentAPI(paymentData);
      if (response.status === 200) {
        const redirectUrl = response.data;
        toast.success(t("redirecting_fawry"));
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSaveBooking = useCallback(async () => {
    try {
      if (
        paymentMethod === "TRENT_BALANCE" &&
        Number(bookingData?.wallet_balance) < bookingData.final_total
      ) {
        toast.error(t("insufficient_balance"));
        return;
      }
      if (paymentMethod === "TRENT_BALANCE") {
        setLoading(true);
      }
      const payload = {
        prop_id: id ? id : "",
        guest_counts: bookingData?.guest_count,
        from_date: bookingData?.from_date,
        to_date: bookingData?.to_date,
        confirm_guest_rules: bookingData?.confirm_guest_rules,
        uid: uid ? uid : "",
        lang: currentLanguage,
        method_key: paymentMethod,
        item_id: itemId,
        ...(merchantRefNumber && { merchantRefNumber }),
      };
      const response = await saveBookingAPI(payload);
      if (response?.data?.response_code === 200) {
        setIsSuccessModal(true);
        setSaveBookingResponse(response?.data?.data?.booking_details);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [paymentMethod, bookingData, merchantRefNumber, itemId, id, t]);
  const fawryPaymentStatus = async () => {
    try {
      setLoading(true);

      const response = await paymentStatusAPI(
        merchantRefNumber,
        itemId,
        bookingData.final_total ? bookingData?.final_total.toFixed(0) : ""
      );
      if (response.status === 200) {
        toast.success(t("payment_checked_successfully"));
        const status = response?.data?.data?.status ? "PAID" : "UNPAID";
        updateQueryParamInURL("orderStatus", status);
        setOrderStatus(status);
      }
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (orderStatus === "PAID" && !saveBookingResponse) {
      handleSaveBooking();
    }
  }, [orderStatus, saveBookingResponse, handleSaveBooking]);
  return (
    <>
      <div className="py-10 px-5 xl:px-20 max-w-7xl mx-auto">
        <div className="flex gap-2 items-center">
          <Link to={`/properties/${id}/book`}>
            {currentLanguage === "ar" ? <ChevronRight /> : <ChevronLeft />}
          </Link>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {t("confirm_and_pay")}
          </h2>
        </div>
        {isLargeScreen ? (
          <div className="px-2 md:px-10 flex flex-col lg:flex-row justify-between py-10 gap-10">
            <div className="lg:flex-1">
              <h4 className="font-semibold text-xl">{t("booking_checkout")}</h4>
              <div className="flex flex-col gap-4 py-5">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-medium text-lg pb-1">
                      {t("check_in")}
                    </h5>
                    <p className="font-medium">{bookingData?.from_date}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-lg pb-1">
                      {t("check_out")}
                    </h5>
                    <p className="font-medium">{bookingData?.to_date}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-lg pb-1">{t("guests")}</h5>
                  <p className="font-medium">{bookingData?.guest_count}</p>
                </div>
              </div>
              <div className="lg:py-5">
                <h3 className="font-semibold text-2xl pb-4">
                  {t("choose_how_to_pay")}
                </h3>
                <PaymentMethodSelector
                  paymentMethod={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  TrentCredits={bookingData?.wallet_balance}
                />
              </div>
              {orderStatus && (
                <PaymentStatus
                  referenceNumber={referenceNumber || ""}
                  orderStatus={orderStatus}
                  paymentAmount={paymentAmount || ""}
                  paymentMethodFromUrl={paymentMethodFromUrl || ""}
                />
              )}
              {statusCode && statusDescription && (
                <CardPaymentStatus
                  statusCode={statusCode}
                  statusDescription={statusDescription}
                />
              )}
            </div>
            <div className="lg:flex-[2] lg:flex lg:justify-end">
              <PriceDetails bookingData={bookingData} />
            </div>
          </div>
        ) : (
          <div className="px-2 md:px-10 flex flex-col lg:flex-row justify-between py-10 gap-10">
            <div className="lg:flex-1">
              <h4 className="font-medium text-xl">{t("booking_checkout")}</h4>
              <div className="flex flex-col gap-4 py-5">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-medium text-lg pb-1">
                      {t("check_in")}
                    </h5>
                    <p className="font-medium">{bookingData?.from_date}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-lg pb-1">
                      {t("check_out")}
                    </h5>
                    <p className="font-medium">{bookingData?.to_date}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-lg pb-1">
                    {t("guests_count")}
                  </h5>
                  <p className="font-medium">{bookingData?.guest_count}</p>
                </div>
              </div>
            </div>
            <div className="lg:flex-[2] lg:flex lg:justify-end">
              <PriceDetails bookingData={bookingData} />
            </div>
            <div className="py-0 lg:py-5">
              <h3 className="font-semibold text-2xl pb-4">
                {t("choose_how_to_pay")}
              </h3>
              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                TrentCredits={bookingData?.wallet_balance}
              />
            </div>
            {orderStatus && (
              <PaymentStatus
                referenceNumber={referenceNumber || ""}
                orderStatus={orderStatus}
                paymentAmount={paymentAmount || ""}
                paymentMethodFromUrl={paymentMethodFromUrl || ""}
              />
            )}
            {statusCode && (
              <CardPaymentStatus
                statusCode={statusCode}
                statusDescription={statusDescription || ""}
              />
            )}
          </div>
        )}
        {orderStatus !== "PAID" && (
          <div className="px-2 md:px-10 flex justify-end">
            <Button
              type="button"
              disabled={loading}
              onClick={
                orderStatus === "UNPAID"
                  ? fawryPaymentStatus
                  : paymentMethod === "TRENT_BALANCE"
                  ? handleSaveBooking
                  : createFawryPayment
              }
              className={`bg-primary font-medium text-lg text-white w-32 py-2 rounded-md ${
                orderStatus === "UNPAID" && "w-48"
              }`}
            >
              {loading ? (
                <Loader />
              ) : orderStatus === "UNPAID" ? (
                t("check_payment")
              ) : (
                t("pay")
              )}
            </Button>
          </div>
        )}
      </div>
      {isSuccessModal && saveBookingResponse && (
        <SuccessBookingModal
          isSuccess={true}
          onClose={() => setIsSuccessModal(false)}
          bookingData={saveBookingResponse}
        />
      )}
    </>
  );
}

export default ConfirmAndPay;
