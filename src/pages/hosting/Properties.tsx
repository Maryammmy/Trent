import { useTranslation } from "react-i18next";
import HostingModal from "../../components/hosting/HostingModal";
import ListingItem from "../../components/hosting/properties/propertyItem";

function Properties() {
  const { t } = useTranslation();
  const listings = Array.from({ length: 10 });

  return (
    <>
      <div className="px-5 lg:px-20 py-10">
        <h2 className="text-3xl font-semibold mb-4">{t("your_properties")}</h2>
        <div className="grid grid-cols-3 font-semibold py-3 px-4 bg-gray-100 rounded-md mb-4">
          <h3>property</h3>
          <h3>Location</h3>
          <h3>Status</h3>
        </div>
        <div className="space-y-5">
          {listings.map((_, index) => (
            <ListingItem key={index} id={index + 1} />
          ))}
        </div>
      </div>
      <HostingModal />
    </>
  );
}

export default Properties;
