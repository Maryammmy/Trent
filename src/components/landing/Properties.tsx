import { useTranslation } from "react-i18next";
import Cart from "../Card";
import Button from "../ui/Button";
import Switcher from "../ui/Switcher";
import { useContext, useEffect, useState } from "react";
import FilterModal from "../home/filter/FilterModal";
import { SlidersHorizontal } from "lucide-react";
import PropertyCardSkeleton from "../skeleton/PropertyCardSkeleton";
import CategoryBar from "../CategoryBar";
import { useHomeDataAPI } from "../../services/homeService";
import { IProperty } from "../../interfaces/propertyInterface";
import { FilterDataContext } from "../../context/FilterDataContext";

export default function Properties() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const ITEMS_TO_LOAD = 20;
  const { t } = useTranslation();
  const { data } = useHomeDataAPI({}, true);
  const { filterData } = useContext(FilterDataContext);
  const [properties, setProperties] = useState<IProperty[] | null>(null);
  const allProperties: IProperty[] = data?.data?.data?.property_list;
  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_TO_LOAD);
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setProperties(filterData || allProperties);
  }, [filterData, allProperties]);

  return (
    <>
      <div>
        <div className="px-5 xl:px-20 mt-5 flex flex-wrap gap-3 justify-end">
          <div className="flex items-center gap-2 border p-2 rounded-md bg-white">
            <span className="text-sm">{t("display_total_before_taxes")}</span>
            <Switcher />
          </div>
          <Button
            className="flex gap-2 items-center border rounded-md px-3 py-2 text-primary"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal
              size={15}
              strokeWidth={2.5}
              className="text-primary"
            />
            <span className="font-medium text-sm">{t("filters")}</span>
          </Button>
        </div>
        <CategoryBar />
        <div
          className={`px-5 xl:px-20 ${
            properties?.length || !properties
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : ""
          }`}
        >
          {!properties ? (
            <PropertyCardSkeleton cards={8} />
          ) : properties?.length ? (
            properties
              ?.slice(0, visibleCount)
              .map((property) => <Cart key={property.id} property={property} />)
          ) : (
            <div className="flex justify-center items-center h-[50vh] text-dark font-medium w-full">
              No properties found
            </div>
          )}
          {loading && <PropertyCardSkeleton cards={ITEMS_TO_LOAD} />}
        </div>
        {properties && visibleCount < properties.length && !loading && (
          <div className="flex justify-center mt-10 mb-5">
            <Button
              onClick={handleShowMore}
              className="bg-white zoom text-primary border-2 border-primary font-medium py-2 px-4 rounded-lg text-center"
            >
              <span>{t("show_more")}</span>
            </Button>
          </div>
        )}
      </div>
      <FilterModal
        isFilterOpen={isFilterOpen}
        close={() => setIsFilterOpen(false)}
      />
    </>
  );
}
