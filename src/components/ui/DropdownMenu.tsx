import { menuItems } from "../../data";
import LoginModal from "../LoginModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsDropdownOpen,
  setIsLoggedIn,
} from "../../store/features/categoryBar/categoryBarSlice";
import { useTranslation } from "react-i18next";

function DropdownMenu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isDropdownOpen } = useAppSelector((state) => state.categoryBar);

  const openLoginModal = () => {
    dispatch(setIsLoggedIn(true));
    dispatch(setIsDropdownOpen(false));
  };
  return (
    <>
      {isDropdownOpen && (
        <div
          className={`z-50 fixed md:top-16 lg:top-24 xl:top-20 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg ${
            document.documentElement.dir === "rtl"
              ? "left-2 xl:left-10"
              : "right-2 xl:right-10"
          }`}
        >
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${
                  item === "log_in" ? "border-b pb-5" : ""
                } px-4 py-2 hover:bg-gray-100 cursor-pointer`}
                onClick={() =>
                  (item === "log_in" || item === "sign_up") && openLoginModal()
                }
              >
                {t(item)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <LoginModal />
    </>
  );
}

export default DropdownMenu;
