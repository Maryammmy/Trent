import { useTranslation } from "react-i18next";
import Cart from "../components/Card";
import CategoryBar from "../components/CategoryBar";
import Button from "../components/ui/Button";
import Switcher from "../components/ui/Switcher";
import { useState } from "react";
import FilterModal from "../components/home/filter/FilterModal";
import { SlidersHorizontal } from "lucide-react";
import PropertyCardSkeleton from "../components/skeleton/PropertyCardSkeleton";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const cartItems = Array.from({ length: 60 });
  const ITEMS_TO_LOAD = 20;
  const { t } = useTranslation();

  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_TO_LOAD);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div>
        <div>
          <CategoryBar />
          <div className="px-5 xl:px-20 flex gap-3 justify-end">
            <Button className="mt-14 xl:mt-20 flex items-center gap-2 border p-2 rounded-md bg-white">
              <span className="text-sm">{t("display_total_before_taxes")}</span>
              <Switcher />
            </Button>
            <Button
              className="mt-14 xl:mt-20 flex gap-2 items-center border rounded-md px-3"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal size={15} strokeWidth={2.5} />
              <span className="font-medium text-sm">{t("filters")}</span>
            </Button>
          </div>
        </div>
        <div className="py-5 px-5 xl:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {cartItems.slice(0, visibleCount).map((_, index) => (
            <Cart key={index} />
          ))}
          {loading && <PropertyCardSkeleton cards={ITEMS_TO_LOAD} />}
        </div>
        {visibleCount < cartItems.length && !loading && (
          <div className="flex justify-center my-5">
            <Button
              onClick={handleShowMore}
              className="bg-black text-white font-medium py-2 px-4 rounded-lg text-center"
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
