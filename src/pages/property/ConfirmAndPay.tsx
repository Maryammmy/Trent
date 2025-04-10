import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import PriceDetails from "../../components/property/confirmAndPay/PriceDetails";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

function ConfirmAndPay() {
  const { t } = useTranslation();

  return (
    <div className="py-10 px-5 xl:px-20 max-w-7xl mx-auto">
      <div className="flex gap-2 items-center">
        <Link to={`/properties/1`}>
          <ChevronLeft />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {t("confirm_and_pay")}
        </h2>
      </div>
      <div className="px-2 md:ps-9 flex flex-col lg:flex-row justify-between py-10">
        <div>
          <h4 className="font-medium text-xl">{t("your_trip")}</h4>
          <div className="flex flex-col gap-4 py-5">
            <div>
              <h5 className="font-medium text-lg pb-1">{t("dates")}</h5>
              <p className="font-medium">Mar 17 - 20</p>
            </div>
            <div>
              <h5 className="font-medium text-lg pb-1">{t("guests")}</h5>
              <p className="font-medium">1 guest</p>
            </div>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-2xl">{t("choose_how_to_pay")}</h3>
          </div>
          <Button className="bg-primary text-white px-4 py-2 rounded">
            Pay with Fawry
          </Button>
        </div>
        <div>
          <PriceDetails />
        </div>
      </div>
    </div>
  );
}

export default ConfirmAndPay;
