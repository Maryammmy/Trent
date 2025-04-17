import PayoutTransaction from "@/components/payout/PayoutTransaction";
// import { useTranslation } from "react-i18next";
import Image from "@/components/ui/Image";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function Payout() {
  // const { t } = useTranslation();
  const arr = Array.from({ length: 10 });
  return (
    <div className="py-10 px-5 xl:px-20 max-w-6xl">
      <div className="mx-auto w-full sm:w-96 h-52">
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
      <div className="pt-5">
        <h2 className="text-2xl font-semibold">History</h2>
        <div className="grid grid-cols-1 gap-5 sm:gap-8 mt-5">
          {arr.map((_, index) => (
            <PayoutTransaction key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payout;
