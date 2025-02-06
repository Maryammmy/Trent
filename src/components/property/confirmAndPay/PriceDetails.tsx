import Image from "../../ui/Image";
import property from "../../../assets/iamges/property.jpg";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function PriceDetails() {
  const { t } = useTranslation();
  const pricePerNight = 101.1;
  const nights = 5;
  const insuranceFee = 7.78;
  const serviceFee = 95.95;
  const total = pricePerNight * nights + insuranceFee + serviceFee;
  const priceDetails = [
    {
      label: `EGP ${pricePerNight} x ${nights} ${t("nights")}`,
      value: `EGP ${(pricePerNight * nights).toFixed(2)}`,
    },
    { label: t("insurance_fee"), value: `EGP ${insuranceFee}` },
    { label: t("Trent_service_fee"), value: `EGP ${serviceFee}` },
  ];

  return (
    <div className="border p-6 w-full rounded-lg md:w-[500px]">
      <div className="flex flex-col md:flex-row gap-5 border-b pb-6">
        <div className="w-28 h-28 rounded-lg overflow-hidden bg-slate-400">
          <Image
            imageUrl={property}
            alt="property"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="max-w-56 text-lg font-semibold">
            Couplespod at Riverstone House Portfolio
          </h4>
          <p>Farm stay</p>
          <div className="flex items-center gap-1">
            <span>
              <FaStar />
            </span>
            <span className="text-sm font-medium">4.94</span>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <h4 className="text-lg lg:text-xl font-semibold">
          {t("price_details")}
        </h4>
        <div className="my-2 pb-4 font-medium border-b">
          {priceDetails.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-semibold text-lg pt-4">
          <span>{t("total")} (EGP)</span>
          <span>EGP {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
