import { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import Switcher from "../ui/Switcher";
import { SlidersHorizontal } from "lucide-react";
import PropertyCardSkeleton from "../skeleton/PropertyCardSkeleton";
import CategoryBar from "../CategoryBar";
import { useHomeDataAPI } from "../../services/homeService";
import { IProperty } from "../../interfaces/property/propertyInterface";
import { FilterDataContext } from "../../context/FilterDataContext";
import FilterModal from "../home/filter/FilterModal";
import Map from "../map/Map";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setEnableMap } from "../../store/features/map/mapSlice";

const Cart = lazy(() => import("../Card"));
const uid = Cookies.get("user_id");
export default function Properties() {
  const ITEMS_TO_LOAD = 20;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const propertiesSectionRef = useRef<HTMLDivElement | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [properties, setProperties] = useState<IProperty[] | null>(null);
  const { enableMap } = useAppSelector((state) => state.map);
  const { filterData, category } = useContext(FilterDataContext);
  const { data } = useHomeDataAPI({ category_id: category, uid }, true);
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
  const handleToggleView = () => {
    dispatch(setEnableMap(!enableMap));
    setTimeout(() => {
      if (!propertiesSectionRef.current) return;
      const topOffset =
        propertiesSectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <div ref={propertiesSectionRef}>
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
        <div className="flex justify-center items-center">
          <Button
            onClick={handleToggleView}
            className="rounded-full fixed bottom-20 z-50 font-medium w-28 py-3 text-white bg-primary"
          >
            {enableMap ? t("show_list") : t("show_map")}
          </Button>
        </div>
        {!enableMap && (
          <div>
            <div
              className={`px-5 xl:px-20 pb-10 ${
                properties?.length || !properties
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  : ""
              }`}
            >
              {!properties ? (
                <PropertyCardSkeleton cards={8} />
              ) : properties?.length ? (
                properties?.slice(0, visibleCount).map((property) => (
                  <Suspense
                    fallback={<PropertyCardSkeleton cards={8} />}
                    key={property.id}
                  >
                    <Cart property={property} />
                  </Suspense>
                ))
              ) : (
                <div className="flex justify-center items-center h-[50vh] text-dark font-medium w-full">
                  No properties found
                </div>
              )}
              {loading && <PropertyCardSkeleton cards={8} />}
            </div>
            {properties && visibleCount < properties.length && !loading && (
              <div className="flex justify-center my-5">
                <Button
                  data-aos="fade-down"
                  onClick={handleShowMore}
                  className="bg-white zoom text-primary border-2 border-primary font-medium py-2 px-4 rounded-lg text-center"
                >
                  <span>{t("show_more")}</span>
                </Button>
              </div>
            )}
          </div>
        )}
        {enableMap && <Map properties={properties} />}
      </div>
      <FilterModal
        isFilterOpen={isFilterOpen}
        close={() => setIsFilterOpen(false)}
      />
    </>
  );
}
