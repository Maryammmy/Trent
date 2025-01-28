import { Globe, Menu, UserRound } from "lucide-react";
import Button from "./ui/Button";
import DropdownMenu from "./ui/DropdownMenu";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import HomeSearch from "./home/HomeSearch";
import logo from "../assets/iamges/logo.png";
import Image from "./ui/Image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  setIsDestinationOpen,
  setIsDropdownOpen,
  setIsLangSwitcherOpen,
} from "../store/features/homeSearch/homeSearchSlice";

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isDropdownOpen, isLangSwitcherOpen } = useAppSelector(
    (state) => state.homeSearch
  );
  const toggleLangSwitcher = () => {
    dispatch(setIsLangSwitcherOpen(!isLangSwitcherOpen));
    dispatch(setIsDropdownOpen(false));
    dispatch(setIsDestinationOpen(false));
  };
  const toggleMenu = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
    dispatch(setIsLangSwitcherOpen(false));
    dispatch(setIsDestinationOpen(false));
  };

  return (
    <>
      <header className="border-b fixed top-0 left-0 right-0 w-full bg-white z-30">
        <div className="px-5 xl:px-20 m-auto flex flex-col gap-2 md:flex-row md:justify-between items-center py-2 md:py-5">
          <Link to="/" className="w-[28%] md:w-[8%]">
            <Image
              imageUrl={logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </Link>
          <HomeSearch />
          <div className="hidden md:flex items-center gap-2">
            <div className="hidden 2xl:block font-semibold py-2 px-4 rounded-full hover:bg-[#F7F7F7]">
              <h3>{t("trent_your_home")}</h3>
            </div>
            <div className="relative">
              <Button
                onClick={toggleLangSwitcher}
                className="hidden xl:block py-2 px-4 rounded-full hover:bg-[#F7F7F7]"
              >
                <Globe size={18} />
              </Button>
              {isLangSwitcherOpen && <LanguageSwitcher />}
            </div>
            <div className="relative">
              <Button
                onClick={toggleMenu}
                className="flex items-center border py-2 px-3 rounded-full gap-1 hover:shadow-lg"
              >
                <div>
                  <Menu size={18} />
                </div>
                <div>
                  <UserRound />
                </div>
              </Button>
              {isDropdownOpen && <DropdownMenu />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
