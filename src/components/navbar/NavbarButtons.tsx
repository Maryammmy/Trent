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
import LanguageSwitcher from "../LanguageSwitcher";
import DropdownMenu from "../ui/DropdownMenu";

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
  };

  const toggleMenu = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
    dispatch(setIsLangSwitcherOpen(false));
    dispatch(setIsDestinationOpen(false));
  };

  return (
    <>
      {isLoggedin && (
        <div className="flex items-center gap-4">
          <div className="relative" ref={languageSwitcherRef}>
            <Button
              onClick={toggleLangSwitcher}
              className="hidden xl:block py-2 px-4 rounded-full hover:bg-[#F7F7F7]"
            >
              <Globe size={18} className="text-white" />
            </Button>
            {isLangSwitcherOpen && <LanguageSwitcher />}
          </div>
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={toggleMenu}
              className="flex items-center border py-2 px-3 rounded-full gap-2 hover:shadow-lg"
            >
              <Menu size={18} className="text-white" />
              <UserRound className="text-white" />
            </Button>
            {isDropdownOpen && <DropdownMenu />}
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarButtons;
