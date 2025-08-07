import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import { IBooking } from "@/interfaces/booking";
import { useCallback, useEffect, useRef, useState } from "react";
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
import PaymentMethodSelector from "@/components/property/confirmAndPay/PaymentMethodSelector";
import {
  completePaymentAPI,
  paymentStatusAPI,
} from "@/services/bookingService";
import SuccessBookingModal from "@/components/property/confirmAndPay/SuccessBookingModal";
import CardPaymentStatus from "@/components/property/confirmAndPay/CardPaymentStatus";
import { updateQueryParamInURL } from "@/utils/updateQueryParamInURL";
import { currentLanguage, uid } from "@/constants";
import PriceDetails from "@/components/accountSettings/bookings/PriceDetails";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { useUserAPI } from "@/services/userService";
import { IUser } from "@/interfaces/accountSettings";

function Payment() {
  const [loading, setLoading] = useState(false);
  const [checkStatusLoading, setCheckStatusLoading] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const { id } = useParams();
  const returnUrl = `${window.location.origin}/account-settings/bookings/payment/${id}`;
  const bookingData: IBooking =
    location?.state?.data ||
    JSON.parse(sessionStorage.getItem("booking") || "null");
  const { data } = useFawryCredentialsAPI();
  const fawryCredentials = data?.data?.data?.fawry_credentials;
  const referenceNumber = useQueryParam("referenceNumber");
  const orderStatusFromUrl = useQueryParam("orderStatus");
  const paymentMethodFromUrl = useQueryParam("paymentMethod");
  const statusCode = useQueryParam("statusCode");
  const statusDescription = useQueryParam("statusDescription");
  const merchantRefNumber = useQueryParam("merchantRefNumber") || "";
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [saveBookingResponse, setSaveBookingResponse] = useState(null);
  const [orderStatus, setOrderStatus] = useState(orderStatusFromUrl);
  const isCardPayment =
    paymentMethodFromUrl === "PayUsingCC" ||
    paymentMethodFromUrl === "CARD" ||
    statusDescription?.toLowerCase().includes("card");
  const normalizedPaymentMethodFromUrl = isCardPayment
    ? "CARD"
    : paymentMethodFromUrl;
  const [paymentMethod, setPaymentMethod] = useState(
    normalizedPaymentMethodFromUrl || "CARD"
  );
  const isSameAsOriginalPaymentMethod =
    paymentMethod === normalizedPaymentMethodFromUrl;
  const shouldShowCheckPaymentButton =
    orderStatus === "UNPAID" && isSameAsOriginalPaymentMethod;
  const actualPaymentMethod =
    paymentMethod === "TRENT_BALANCE"
      ? "TRENT_BALANCE"
      : normalizedPaymentMethodFromUrl || paymentMethod;
  const walletBalance = Number(bookingData?.wallet_balance);
  const itemId = bookingData.item_id.toString();
  const hasSavedRef = useRef(false);
  const remainingValue = Number(bookingData?.reminder_value);
  const { data: user } = useUserAPI();
  const userData: IUser = user?.data?.data?.user_data;
  const createFawryPayment = async () => {
    try {
      if (!paymentMethod) {
        toast.error(t("select_payment_method"));
        return;
      }
      setLoading(true);
      const paymentData = generateFawryPaymentInitData({
        encryptedMerchantCode: fawryCredentials?.merchant_code,
        encryptedSecureKey: fawryCredentials?.secure_key,
        itemId,
        price: remainingValue,
        paymentMethod,
        returnUrl,
        ...(userData?.email && { customerEmail: userData?.email }),
        ...(userData?.c_code === "+20" &&
          userData?.phone && { customerMobile: `0${userData?.phone}` }),
        customerName: userData?.full_name,
      });
      const response = await initFawryPaymentAPI(paymentData);
      if (response.status === 200) {
        const redirectUrl = response.data;
        toast.success(t("redirecting_fawry"));
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);
      }
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const fawryPaymentStatus = async () => {
    try {
      setCheckStatusLoading(true);
      const response = await paymentStatusAPI(
        merchantRefNumber,
        itemId,
        bookingData?.reminder_value
      );
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        const status = response?.data?.data?.status ? "PAID" : "UNPAID";
        updateQueryParamInURL("orderStatus", status);
        setOrderStatus(status);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setCheckStatusLoading(false);
    }
  };
  const handleCompletePayment = useCallback(async () => {
    if (hasSavedRef.current) return;
    hasSavedRef.current = true;
    try {
      if (paymentMethod === "TRENT_BALANCE" && walletBalance < remainingValue) {
        toast.error(t("insufficient_balance"));
        return;
      }
      if (
        paymentMethod === "TRENT_BALANCE" &&
        walletBalance >= remainingValue
      ) {
        setLoading(true);
      }
      const payload = {
        uid: uid,
        item_id: itemId,
        lang: currentLanguage,
        booking_id: bookingData?.book_id,
        method_key: actualPaymentMethod,
        ...(merchantRefNumber && { merchant_ref_number: merchantRefNumber }),
      };
      const response = await completePaymentAPI(payload);
      if (response?.data?.response_code === 200) {
        setIsSuccessModal(true);
        setSaveBookingResponse(response?.data?.data?.booking_details);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  }, [
    bookingData?.book_id,
    itemId,
    merchantRefNumber,
    actualPaymentMethod,
    paymentMethod,
    remainingValue,
    t,
    walletBalance,
  ]);
  useEffect(() => {
    if (orderStatus === "PAID" && !hasSavedRef.current) {
      handleCompletePayment();
    }
  }, [orderStatus, handleCompletePayment]);
  return (
    <>
      <div className="py-10 px-5 xl:px-20 max-w-7xl mx-auto">
        <div className="flex gap-2 items-center">
          <Link to={`/account-settings/bookings?status=active`}>
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
                    <p className="font-medium">{bookingData?.check_in}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-lg pb-1">
                      {t("check_out")}
                    </h5>
                    <p className="font-medium">{bookingData?.check_out}</p>
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
              {(shouldShowCheckPaymentButton || orderStatus === "PAID") && (
                <PaymentStatus
                  referenceNumber={referenceNumber || ""}
                  orderStatus={orderStatus}
                  paymentMethodFromUrl={normalizedPaymentMethodFromUrl || ""}
                />
              )}
              {statusCode && statusDescription && (
                <CardPaymentStatus
                  statusCode={statusCode}
                  statusDescription={statusDescription}
                  orderStatus={orderStatus}
                  paymentMethod={paymentMethod}
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
                    <p className="font-medium">{bookingData?.check_in}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-lg pb-1">
                      {t("check_out")}
                    </h5>
                    <p className="font-medium">{bookingData?.check_out}</p>
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
            {(shouldShowCheckPaymentButton || orderStatus === "PAID") && (
              <PaymentStatus
                referenceNumber={referenceNumber || ""}
                orderStatus={orderStatus}
                paymentMethodFromUrl={normalizedPaymentMethodFromUrl || ""}
              />
            )}
            {statusCode && statusDescription && (
              <CardPaymentStatus
                statusCode={statusCode}
                statusDescription={statusDescription}
                orderStatus={orderStatus}
                paymentMethod={paymentMethod}
              />
            )}
          </div>
        )}
        {orderStatus !== "PAID" && (
          <div className="px-2 md:px-10 flex justify-end gap-4">
            {shouldShowCheckPaymentButton && (
              <Button
                type="button"
                disabled={checkStatusLoading}
                onClick={fawryPaymentStatus}
                className="bg-secondary font-medium text-lg text-white w-48 py-2 rounded-md"
              >
                {checkStatusLoading ? <Loader /> : t("check_payment")}
              </Button>
            )}
            <Button
              type="button"
              disabled={loading}
              onClick={
                paymentMethod === "TRENT_BALANCE"
                  ? handleCompletePayment
                  : createFawryPayment
              }
              className="bg-primary font-medium text-lg text-white w-32 py-2 rounded-md"
            >
              {loading ? <Loader /> : t("pay")}
            </Button>
          </div>
        )}
      </div>
      {isSuccessModal && saveBookingResponse && (
        <SuccessBookingModal
          isSuccess={isSuccessModal}
          onClose={() => setIsSuccessModal(false)}
          bookingData={saveBookingResponse}
        />
      )}
    </>
  );
}

export default Payment;
