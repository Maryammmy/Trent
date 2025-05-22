import { useTranslation } from "react-i18next";
import Image from "@/components/ui/Image";
import { CurrentLanguage } from "@/types";
import { useState } from "react";
import PayoutDetailsModal from "@/components/payout/PayoutDetailsModal";
import { Link } from "react-router-dom";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function Payouts() {
  const { t } = useTranslation();
  const [payoutDetails, setPayoutDetails] = useState(false);
  return (
    <>
      <div className="py-10 px-5 xl:px-0 max-w-6xl mx-auto">
        <div className=" w-full sm:w-96 h-52 relative rounded-2xl overflow-hidden">
          <div className="absolute h-full left-5 py-2 pointer-events-none z-[5] flex flex-col justify-between">
            <h2 className="text-white font-semibold text-xl pt-5">
              {t("payouts")}
            </h2>
            <div className="flex flex-col gap-1">
              <span className="text-white font-semibold text-2xl">
                1200 {t("EGP")}
              </span>
              <span className="text-white font-semibold text-lg">
                {t("your_total_earnings")}
              </span>
            </div>
          </div>
          <div className="w-full h-full">
            <Image
              imageUrl={
                currentLanguage === "ar"
                  ? "/images/walletIMageAr.png"
                  : "/images/walletIMage.png"
              }
              alt="card"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text-2xl font-semibold">{t("payouts_history")}</h2>
          {/* <div className="grid grid-cols-1 gap-5 sm:gap-8 mt-5">
            {arr.map((_, index) => (
              <PayoutTransaction
                key={index}
              />
            ))}
          </div> */}
        </div>
        <div className="flex justify-end pt-10">
          <Link
            to="/hosting/payouts/request"
            className=" bg-primary text-center text-white py-3 w-44 text-lg rounded-md font-medium"
          >
            {t("payout_request")}
          </Link>
        </div>
      </div>
      <PayoutDetailsModal
        isOpen={payoutDetails}
        onClose={() => setPayoutDetails(false)}
      />
    </>
  );
}

export default Payouts;
