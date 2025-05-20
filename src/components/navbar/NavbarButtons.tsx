import { Menu, UserRound } from "lucide-react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import {
  setIsDestinationOpen,
  setIsDropdownOpen,
} from "../../store/features/homeSearch/homeSearchSlice";
import Button from "../ui/Button";
import { setToggle } from "../../store/features/navbar/navbarSlice";
import CurrencySwitcher from "../CurrencySwitcher";
import Notifications from "../notifications/Notifications";
import { useMediaQuery } from "react-responsive";
import DropdownMenu from "../DropdownMenu";
import LanguageSwitcher from "../LanguageSwitcher";

const isLoggedin = Cookies.get("user_id");
const NavbarButtons = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery({ maxWidth: 374 });

  const { isDropdownOpen } = useAppSelector((state) => state.homeSearch);

  useClickOutside(dropdownRef, () => dispatch(setIsDropdownOpen(false)));

  const toggleMenu = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
    dispatch(setIsDestinationOpen(false));
    dispatch(setToggle(false));
  };

  return (
    <>
      <div className={`flex items-center ${isSmallScreen ? "gap-3" : "gap-5"}`}>
        <LanguageSwitcher />
        <CurrencySwitcher />
        {isLoggedin && (
          <>
            <Notifications />
            <div className="relative" ref={dropdownRef}>
              <Button
                onClick={toggleMenu}
                className="flex items-center border p-1 sm:py-2 sm:px-3 rounded-full gap-2 text-white hover:bg-secondary"
              >
                <Menu size={18} />
                <UserRound />
              </Button>
              {isDropdownOpen && <DropdownMenu />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NavbarButtons;
