import { menuItems } from "../../data";
import { useAppDispatch } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import {
  setIsDropdownOpen,
  setIsLoggedIn,
} from "../../store/features/homeSearch/homeSearchSlice";
import Button from "./Button";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

function DropdownMenu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => dispatch(setIsDropdownOpen(false)));
  const openLoginModal = () => {
    dispatch(setIsLoggedIn(true));
    dispatch(setIsDropdownOpen(false));
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className={`z-50 hidden md:block absolute top-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg ${
          document.documentElement.dir === "rtl" ? "left-0" : "right-0"
        }`}
      >
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`${
                item === "log_in" ? "border-b pb-5" : ""
              } px-4 py-2 hover:bg-gray-100 cursor-pointer`}
            >
              <Button
                className="w-full text-start"
                onClick={() => item === "log_in" && openLoginModal()}
              >
                {t(item)}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DropdownMenu;
