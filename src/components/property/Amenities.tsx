import { useTranslation } from "react-i18next";
import { amenities } from "../../data/property/amenities";

function Amenities() {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-semibold py-6">
        {t("what_this_place_offers")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-lg">
        {amenities.map((item, index) => {
          const { text, icon } = item;
          return (
            <div key={index} className="flex  items-center gap-2">
              <span>{icon}</span>
              <p className="font-medium">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
