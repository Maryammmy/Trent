import { useTranslation } from "react-i18next";
import HostingModal from "../../components/hosting/HostingModal";
import ListingItem from "../../components/hosting/listings/ListingItem";

function Listings() {
  const { t } = useTranslation();
  const listings = Array.from({ length: 10 });
  return (
    <>
      <div className="px-5 lg:px-20 py-10">
        <h2 className="text-3xl font-semibold">{t("your_listings")}</h2>
        <table className="w-full table-fixed border-separate border-spacing-y-5">
          <thead>
            <tr>
              <th className="text-left">Listing</th>
              <th className="text-left">Location</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((_, index) => (
              <ListingItem key={index} />
            ))}
          </tbody>
        </table>
      </div>
      <HostingModal />
    </>
  );
}

export default Listings;
