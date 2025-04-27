import { Globe, Menu, UserRound } from "lucide-react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import {
  setIsDestinationOpen,
  setIsDropdownOpen,
  setIsLangSwitcherOpen,
} from "../../store/features/homeSearch/homeSearchSlice";
import Button from "../ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import DropdownMenu from "./DropdownMenu";
import { setToggle } from "../../store/features/navbar/navbarSlice";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const isLoggedin = Cookies.get("user_id");
const NavbarButtons = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageSwitcherRef = useRef<HTMLDivElement>(null);

  const { isDropdownOpen, isLangSwitcherOpen } = useAppSelector(
    (state) => state.homeSearch
  );

  useClickOutside(dropdownRef, () => dispatch(setIsDropdownOpen(false)));
  useClickOutside(languageSwitcherRef, () =>
    dispatch(setIsLangSwitcherOpen(false))
  );

  const toggleLangSwitcher = () => {
    dispatch(setIsLangSwitcherOpen(!isLangSwitcherOpen));
    dispatch(setIsDropdownOpen(false));
    dispatch(setIsDestinationOpen(false));
    dispatch(setToggle(false));
  };

  const toggleMenu = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
    dispatch(setIsLangSwitcherOpen(false));
    dispatch(setIsDestinationOpen(false));
    dispatch(setToggle(false));
  };

  return (
    <>
      {isLoggedin && (
        <div className="flex items-center gap-3 md:gap-4">
          <div className="sm:flex sm:items-center sm:gap-2">
            <div>
              <span className="text-white font-medium hidden sm:block">
                {currentLanguage === "en" ? "(العربيه)" : "(English)"}
              </span>
            </div>
            <div className="relative" ref={languageSwitcherRef}>
              <Button
                onClick={toggleLangSwitcher}
                className="md:py-2 md:px-4 rounded-full text-white md:hover:bg-[#F7F7F7] md:hover:text-dark"
              >
                <Globe size={18} />
              </Button>
              {isLangSwitcherOpen && <LanguageSwitcher />}
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={toggleMenu}
              className="flex items-center border py-2 px-3 rounded-full gap-2 text-white hover:bg-[#F7F7F7] hover:text-dark"
            >
              <Menu size={18} />
              <UserRound />
            </Button>
            {isDropdownOpen && <DropdownMenu />}
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarButtons;
