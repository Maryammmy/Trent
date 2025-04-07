import { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import Switcher from "../ui/Switcher";
import { List, MapPinned, SlidersHorizontal } from "lucide-react";
import PropertyCartSkeleton from "../skeleton/PropertyCartSkeleton";
import CategoryBar from "../CategoryBar";
import { useHomeDataAPI } from "../../services/homeService";
import { IProperty } from "../../interfaces/property/property";
import { FilterDataContext } from "../../context/FilterDataContext";
import FilterModal from "../home/filter/FilterModal";
import Map from "../map/Map";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setEnableMap } from "../../store/features/map/mapSlice";

const Cart = lazy(() => import("../Cart"));
export default function Properties() {
  const ITEMS_TO_LOAD = 10;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const propertiesSectionRef = useRef<HTMLDivElement | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [properties, setProperties] = useState<IProperty[] | null>(null);
  const { enableMap } = useAppSelector((state) => state.map);
  const { filterData, category } = useContext(FilterDataContext);
  const { data } = useHomeDataAPI({ category_id: category }, true);
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
        <div className="px-5 xl:px-20 mt-5 flex flex-wrap gap-3 justify-between">
          <Button
            onClick={handleToggleView}
            className="rounded-md font-medium text-sm py-2 w-[120px] text-primary border flex items-center justify-center gap-2"
          >
            {enableMap ? (
              <>
                <List size={15} strokeWidth={2.5} />
                <span>{t("show_list")}</span>
              </>
            ) : (
              <>
                <MapPinned size={15} strokeWidth={2.5} />
                <span>{t("show_map")}</span>
              </>
            )}
          </Button>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 border p-2 rounded-md font-medium text-sm bg-white">
              <span className="hidden sm:block">
                {t("display_total_before_taxes")}
              </span>
              <span className="block sm:hidden">{t("before_taxes")}</span>
              <Switcher />
            </div>

            <Button
              className="flex gap-2 items-center border rounded-md px-3 py-2 font-medium text-sm text-primary"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal size={15} strokeWidth={2.5} />
              <span className="hidden sm:block">{t("filters")}</span>
            </Button>
          </div>
        </div>
        <CategoryBar />
        <div className="flex justify-center items-center"></div>
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
                <PropertyCartSkeleton cards={8} />
              ) : properties?.length ? (
                properties?.slice(0, visibleCount).map((property) => (
                  <Suspense
                    fallback={<PropertyCartSkeleton cards={1} />}
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
              {loading && <PropertyCartSkeleton cards={8} />}
            </div>
            {properties && visibleCount < properties.length && !loading && (
              <div className="flex justify-center my-5">
                <Button
                  data-aos="fade-right"
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
