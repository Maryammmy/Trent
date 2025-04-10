import { useTranslation } from "react-i18next";
import HostingModal from "../../../components/hosting/HostingModal";
import { useHomeDataAPI } from "../../../services/homeService";
import { IProperty } from "../../../interfaces/property/property";
import Cookies from "js-cookie";
import PropertyHostingSkeleton from "../../../components/skeleton/PropertyHostingSkeleton";
import Property from "../../../components/hosting/properties/property/Property";

const uid = Cookies.get("user_id");
function Properties() {
  const { t } = useTranslation();
  const { data } = useHomeDataAPI({ uid, owner_mode: true }, true);
  const properties: IProperty[] = data?.data?.data?.property_list;
  return (
    <>
      <div className="px-5 lg:px-20 py-10">
        <h2 className="text-3xl font-semibold mb-6">{t("your_properties")}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 font-semibold px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 rounded-md mb-4">
          <h3>{t("property")}</h3>
          <h3 className="hidden sm:block">{t("location")}</h3>
          <h3 className="hidden sm:block">{t("property_type")}</h3>
          <h3 className="hidden sm:block">{t("price_without_egp")}</h3>
          <h3>{t("status")}</h3>
        </div>
        <div className="space-y-5">
          {!properties ? (
            <PropertyHostingSkeleton cards={5} />
          ) : properties?.length ? (
            properties?.map((property) => (
              <Property key={property.id} property={property} />
            ))
          ) : (
            <div className="flex justify-center items-center h-[50vh] text-dark font-medium w-full">
              No properties found
            </div>
          )}
        </div>
      </div>
      <HostingModal />
    </>
  );
}

export default Properties;
