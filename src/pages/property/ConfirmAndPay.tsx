import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import PriceDetails from "../../components/property/confirmAndPay/PriceDetails";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import { IVerifyPropertyResponse } from "@/interfaces/booking";
import Select from "@/components/ui/Select";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import { paymentMethods } from "@/data/booking";
import {
  initFawryPaymentAPI,
  useFawryCredentialsAPI,
} from "@/services/fawryService";
import { generateFawryPaymentData } from "@/utils/generateFawryPaymentData";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { AxiosError } from "axios";

function ConfirmAndPay() {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("PayAtFawry");
  const { t } = useTranslation();
  const location = useLocation();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const { id } = useParams();
  const bookingData: IVerifyPropertyResponse = location?.state?.data;
  const { data } = useFawryCredentialsAPI();
  const fawryCredentials = data?.data?.data?.fawry_credentials;
  console.log("Fawry Credentials:", fawryCredentials);

  const createFawryPayment = async () => {
    try {
      setLoading(true);
      const paymentData = generateFawryPaymentData(
        bookingData?.id,
        bookingData?.price,
        paymentMethod
      );
      const response = await initFawryPaymentAPI(paymentData);
      console.log("Response:", response);
      if (response.status === 200) {
        const redirectUrl = response.data;
        toast.success("Redirecting you to Fawry payment plugin...");
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
  return (
    <div className="py-10 px-5 xl:px-20 max-w-7xl mx-auto">
      <div className="flex gap-2 items-center">
        <Link to={`/properties/${id}/book`}>
          <ChevronLeft />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {t("confirm_and_pay")}
        </h2>
      </div>
      {isLargeScreen ? (
        <div className="px-2 md:px-10 flex flex-col lg:flex-row justify-between py-10 gap-10">
          <div className="lg:flex-1">
            <h4 className="font-medium text-xl">{t("your_trip")}</h4>
            <div className="flex flex-col gap-4 py-5">
              <div className="flex justify-between">
                <div>
                  <h5 className="font-medium text-lg pb-1">{t("check_in")}</h5>
                  <p className="font-medium">{bookingData?.from_date}</p>
                </div>
                <div>
                  <h5 className="font-medium text-lg pb-1">{t("check_out")}</h5>
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
            <div className="lg:py-4">
              <h3 className="font-semibold text-2xl pb-4">
                {t("choose_how_to_pay")}
              </h3>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                options={paymentMethods}
              ></Select>
            </div>
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
                  <h5 className="font-medium text-lg pb-1">{t("check_in")}</h5>
                  <p className="font-medium">{bookingData?.from_date}</p>
                </div>
                <div>
                  <h5 className="font-medium text-lg pb-1">{t("check_out")}</h5>
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
          <div className="py-0 lg:py-4">
            <h3 className="font-semibold text-2xl pb-4">
              {t("choose_how_to_pay")}
            </h3>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              options={paymentMethods}
            ></Select>
          </div>
        </div>
      )}
      <div className="px-2 md:px-10 flex justify-end">
        <Button
          disabled={loading}
          onClick={createFawryPayment}
          className="bg-primary font-medium text-lg text-white w-32 py-2 rounded-md"
        >
          {loading ? <Loader /> : t("pay")}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmAndPay;
