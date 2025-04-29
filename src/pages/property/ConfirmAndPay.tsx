import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import PriceDetails from "../../components/property/confirmAndPay/PriceDetails";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import { IVerifyPropertyResponse } from "@/interfaces/booking";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import {
  initFawryPaymentAPI,
  useFawryCredentialsAPI,
} from "@/services/fawryService";
import { generateFawryPaymentData } from "@/utils/generateFawryPaymentData";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { AxiosError } from "axios";
import { useQueryParam } from "@/utils/getQueryParam";
import PaymentStatus from "@/components/property/confirmAndPay/PaymentStatus";
import { CurrentLanguage } from "@/types";
import PaymentMethodSelector from "@/components/property/confirmAndPay/PaymentMethodSelector";
import Cookies from "js-cookie";
import { saveBookingAPI } from "@/services/bookingService";
import { ApiError } from "@/interfaces";
import SuccessBookingModal from "@/components/property/confirmAndPay/SuccessBookingModal";

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
  const orderStatus = useQueryParam("orderStatus");
  const paymentAmount = useQueryParam("paymentAmount");
  const paymentMethodFromUrl = useQueryParam("paymentMethod");
  const [isSuccessModal, setIsSuccessModal] = useState(true);
  const [saveBookingResponse, setSaveBookingResponse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodFromUrl === "PayUsingCC"
      ? "CARD"
      : paymentMethodFromUrl === "PayAtFawry"
      ? "PayAtFawry"
      : "MWALLET"
  );
  const createFawryPayment = async () => {
    try {
      setLoading(true);
      const paymentData = generateFawryPaymentData(
        fawryCredentials?.merchant_code,
        fawryCredentials?.secure_key,
        bookingData?.id,
        bookingData?.final_total,
        paymentMethod,
        bookingData?.image_list?.[0]?.img,
        returnUrl
      );
      const response = await initFawryPaymentAPI(paymentData);
      console.log("Response:", response);
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
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSaveBooking = async () => {
    try {
      setLoading(true);
      const payload = {
        prop_id: id ? id : "",
        guest_counts: Number(bookingData?.guest_count),
        from_date: bookingData?.from_date,
        to_date: bookingData?.to_date,
        confirm_guest_rules: bookingData?.confirm_guest_rules,
        uid: uid ? uid : "",
        lang: currentLanguage,
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
  };
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
                  <p className="font-medium">
                    {bookingData?.guest_count} {t("guests")}
                  </p>
                </div>
              </div>
              <div className="lg:py-5">
                <h3 className="font-semibold text-2xl pb-4">
                  {t("choose_how_to_pay")}
                </h3>
                <PaymentMethodSelector
                  paymentMethod={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
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
            </div>
            <div className="lg:flex-[2] lg:flex lg:justify-end">
              <PriceDetails bookingData={bookingData} />
            </div>
          </div>
        ) : (
          <div className="px-2 md:px-10 flex flex-col lg:flex-row justify-between py-10 gap-10">
            <div className="lg:flex-1">
              <h4 className="font-medium text-xl">{t("your_trip")}</h4>
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
                  <p className="font-medium">
                    {bookingData?.guest_count} {t("guests")}
                  </p>
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
          </div>
        )}
        <div className="px-2 md:px-10 flex justify-end">
          <Button
            disabled={loading}
            onClick={
              orderStatus === "PAID" ? handleSaveBooking : createFawryPayment
            }
            className={`bg-primary font-medium text-lg text-white w-32 py-2 rounded-md ${
              orderStatus === "PAID" && "w-40"
            }`}
          >
            {loading ? (
              <Loader />
            ) : orderStatus === "PAID" ? (
              t("save_booking")
            ) : (
              t("pay")
            )}
          </Button>
        </div>
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
