import { useTranslation } from "react-i18next";
import Cart from "../components/Card";
import CategoryBar from "../components/CategoryBar";
import Button from "../components/ui/Button";
import Switcher from "../components/ui/Switcher";
import { useState } from "react";
import FilterModal from "../components/home/filter/FilterModal";
import { SlidersHorizontal } from "lucide-react";
// import CategoryBarSkeleton from "../components/skeleton/CategoryBarSkeleton";
// import PropertyCardSkeleton from "../components/skeleton/PropertyCardSkeleton";

export default function Home() {
  const [isFlterOpen, setIsFilterOpen] = useState(false);
  const cartItems = Array.from({ length: 20 });
  const { t } = useTranslation();
  return (
    <>
      <div>
        {/* <CategoryBarSkeleton cards={8} /> */}
        <div>
          <CategoryBar />
          <div className=" px-5 xl:px-20 flex gap-3 justify-end">
            <Button className="mt-[85px] flex items-center gap-2 border p-2 rounded-md bg-white">
              <span className="text-sm">
                {" "}
                {t("display_total_before_taxes")}
              </span>
              <div>
                <Switcher />
              </div>
            </Button>
            <Button
              className="mt-[85px] flex gap-2 items-center border rounded-md px-3"
              onClick={() => setIsFilterOpen(!isFlterOpen)}
            >
              <span>
                <SlidersHorizontal size={15} strokeWidth={2.5} />
              </span>
              <span className="font-medium text-sm">Filters</span>
            </Button>
          </div>
        </div>
        <div className="py-5 px-5 xl:px-20  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {cartItems.map((_, index) => (
            <Cart key={index} />
          ))}
          {/* <PropertyCardSkeleton cards={20} /> */}
        </div>
      </div>
      <FilterModal
        isFilterOpen={isFlterOpen}
        close={() => setIsFilterOpen(false)}
      />
    </>
  );
}
