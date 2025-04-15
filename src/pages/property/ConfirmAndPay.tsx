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
import { initFawryPaymentAPI } from "@/services/fawryService";
import { generateFawryPaymentData } from "@/utils/generateFawryPaymentData";
import toast from "react-hot-toast";

function ConfirmAndPay() {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("PayAtFawry");
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const data: IVerifyPropertyResponse = location?.state?.data;
  const createFawryPayment = async () => {
    try {
      setLoading(true);
      const paymentData = generateFawryPaymentData(
        data?.id,
        data?.price,
        paymentMethod
      );
      const response = await initFawryPaymentAPI(paymentData);
      console.log("Response:", response);
      if (response.status === 200) {
        const redirectUrl = response.data;
        toast.success("Redirecting you to Fawry payment plugin...");
        setTimeout(() => {
          window.open(redirectUrl, "_blank");
          window.location.href = redirectUrl;
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
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
      <div className="px-2 md:ps-9 flex flex-col lg:flex-row justify-between py-10 gap-10">
        <div className="flex-1">
          <h4 className="font-medium text-xl">{t("your_trip")}</h4>
          <div className="flex flex-col gap-4 py-5">
            <div className="flex justify-between">
              <div>
                <h5 className="font-medium text-lg pb-1">{t("check_in")}</h5>
                <p className="font-medium">{data?.from_date}</p>
              </div>
              <div>
                <h5 className="font-medium text-lg pb-1">{t("check_out")}</h5>
                <p className="font-medium">{data?.to_date}</p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-lg pb-1">{t("guests")}</h5>
              <p className="font-medium">
                {data?.guest_count} {t("guests")}
              </p>
            </div>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-2xl">{t("choose_how_to_pay")}</h3>
          </div>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            options={paymentMethods}
          ></Select>
        </div>
        <div className="flex-[2] flex justify-end">
          <PriceDetails data={data} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={createFawryPayment}
          className="bg-primary font-medium text-lg text-white w-40 py-3 rounded-md"
        >
          {loading ? <Loader /> : t("pay")}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmAndPay;
