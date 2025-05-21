import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Button from "../ui/Button";
import FilterModal from "../landing/filter/FilterModal";

interface HomeSearchProps {
  showIcon?: boolean;
}

function HomeSearch({ showIcon = true }: HomeSearchProps) {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={`flex items-center justify-between gap-2 ${
          !showIcon ? "w-[280px]" : "w-[250px] md:w-[500px]"
        } h-[49.6px] rounded-full p-3 border bg-white shadow transition-shadow hover:shadow-lg cursor-pointer`}
      >
        <span className="text-gray-500">{t("where_are_you_going")}</span>
        {showIcon && <Search className="text-primary shrink-0" />}
      </Button>
      {isFilterOpen && (
        <FilterModal
          isFilterOpen={isFilterOpen}
          close={() => setIsFilterOpen(false)}
        />
      )}
    </>
  );
}

export default HomeSearch;
