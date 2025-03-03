import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { setIsSearchOpen } from "../../store/features/homeSearch/homeSearchSlice";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react";

function HomeSearch() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onClick={() => dispatch(setIsSearchOpen(true))}
        className="flex bg-white items-center gap-2 w-[250px] md:w-[500px] rounded-full py-3 px-5 border shadow hover:shadow-lg"
      >
        <Search className="text-primary" />
        <p className="text-primary font-medium">{t("placeholder_search")}</p>
      </Button>
      <SearchModal />
    </>
  );
}

export default HomeSearch;
