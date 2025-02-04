import { authItems, menuItems } from "../../data";
import { useAppDispatch } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { setIsDropdownOpen } from "../../store/features/homeSearch/homeSearchSlice";
import Button from "./Button";
import {
  setIsloggedin,
  setIsSignup,
} from "../../store/features/auth/authSlice";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const openLoginModal = () => {
    dispatch(setIsloggedin(true));
    dispatch(setIsDropdownOpen(false));
  };
  const openSignupModal = () => {
    dispatch(setIsSignup(true));
    dispatch(setIsDropdownOpen(false));
  };

  return (
    <>
      <div
        className={`z-50 hidden md:block absolute top-10 mt-2 min-w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 ${
          document.documentElement.dir === "rtl" ? "left-0" : "right-0"
        }`}
      >
        <ul className=" border-b pb-2 mb-2">
          {authItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer`}
            >
              <Button
                className="w-full text-start"
                onClick={() =>
                  item === "log_in" ? openLoginModal() : openSignupModal()
                }
              >
                <span>{t(item)}</span>
              </Button>
            </li>
          ))}
        </ul>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer`}
            >
              <Link
                onClick={() => dispatch(setIsDropdownOpen(false))}
                to={item === "host_an_experience" ? "/hosting" : ""}
                className="w-full text-start"
              >
                <span>{t(item)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DropdownMenu;
