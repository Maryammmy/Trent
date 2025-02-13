import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { setIsSearchOpen } from "../../store/features/homeSearch/homeSearchSlice";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react";
import SearchComponent from "./SearchComponent";
import { useMediaQuery } from "react-responsive";

function HomeSearch() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  return (
    <>
      <Button
        onClick={() => dispatch(setIsSearchOpen(true))}
        className="flex lg:hidden bg-white items-center gap-2 w-[250px] md:w-[500px] rounded-full py-2 px-5 border shadow hover:shadow-lg"
      >
        <Search className="text-primary" />
        <p className="text-primary font-medium">{t("placeholder_search")}</p>
      </Button>
      {isLargeScreen && <SearchComponent />}
      <SearchModal />
    </>
  );
}

export default HomeSearch;
