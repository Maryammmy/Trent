import { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { List, MapPinned } from "lucide-react";
import PropertyCartSkeleton from "../skeleton/PropertyCartSkeleton";
import CategoryBar from "../CategoryBar";
import { useHomeDataAPI } from "../../services/homeService";
import { FilterDataContext } from "../../context/FilterDataContext";
import Map from "../map/Map";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setEnableMap } from "../../store/features/map/mapSlice";
import { IProperty } from "@/interfaces/property";

const Cart = lazy(() => import("../Cart"));

export default function Properties() {
  /**
   * Items per page that we request from the backend.
   * This replaces the old front‑end slicing logic so that pagination
   * is handled **only** by the API.
   */

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const propertiesSectionRef = useRef<HTMLDivElement | null>(null);

  const [isFixed, setIsFixed] = useState(true);
  const { enableMap } = useAppSelector((state) => state.map);
  const { category, filterSlider, filters } = useContext(FilterDataContext);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useHomeDataAPI({
      category_id: category,
      ...(filterSlider && filterSlider),
      ...(filters && filters),
    });
  console.log(filters);
  // Flatten all pages of property lists
  const properties: IProperty[] | undefined = data?.pages?.flatMap(
    (page) => page?.data?.data?.property_list
  );
  /**
   * Toggle list / map view and scroll back to the properties section.
   */
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

  useEffect(() => {
    const handleScroll = () => {
      if (propertiesSectionRef.current) {
        const rect = propertiesSectionRef.current.getBoundingClientRect();
        setIsFixed(rect.top <= 0 && rect.bottom > window.innerHeight);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div ref={propertiesSectionRef} className="relative mb-16">
        {/* Floating list ↔︎ map toggle */}
        <div
          className={`z-[100] left-1/2 transform -translate-x-1/2 ${
            isFixed ? "fixed bottom-10" : "absolute bottom-[-50px]"
          }`}
        >
          <Button
            onClick={handleToggleView}
            className="rounded-full font-medium text-sm py-2 w-[125px] text-white bg-primary flex items-center justify-center gap-2"
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
        </div>

        {/* Category filters */}
        <CategoryBar />

        {/* LIST VIEW */}
        {!enableMap && (
          <div>
            <div
              className={`px-5 xl:px-20 pt-5 pb-10 ${
                properties?.length || !properties
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  : ""
              }`}
            >
              {/* Loading state */}
              {!properties && <PropertyCartSkeleton cards={8} />}

              {/* Empty state */}
              {properties && !properties?.length && (
                <div className="flex justify-center items-center text-lg h-[50vh] text-dark font-medium w-full">
                  {t("no_properties_found")}
                </div>
              )}

              {/* Property list */}
              {properties && properties?.length > 0 && (
                <>
                  {properties?.map((property) => (
                    <Suspense
                      fallback={<PropertyCartSkeleton cards={1} />}
                      key={property?.id}
                    >
                      <Cart property={property} refetch={refetch} />
                    </Suspense>
                  ))}
                  {/* Loading more skeleton */}
                  {isFetchingNextPage && <PropertyCartSkeleton cards={8} />}
                </>
              )}
            </div>

            {/* Show more button */}
            {hasNextPage && !isFetchingNextPage && (
              <div className="flex justify-center mt-4">
                <Button
                  data-aos="fade-right"
                  onClick={() => fetchNextPage()}
                  className="bg-white zoom text-primary border-2 border-primary font-medium py-2 px-4 rounded-lg text-center"
                >
                  <span>{t("show_more")}</span>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* MAP VIEW */}
        {enableMap && <Map properties={properties} refetch={refetch} />}
      </div>
    </>
  );
}
