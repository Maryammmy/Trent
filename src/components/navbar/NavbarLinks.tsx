import { NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/hooks";
import {
  setIsloggedin,
  setIsSignup,
} from "../../store/features/auth/authSlice";
import { setToggle } from "../../store/features/navbar/navbarSlice";
import { authItems, navItems } from "../../data";

const isLoggedin = Cookies.get("user_id");
const NavbarLinks = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <ul className="font-medium flex flex-col justify-center items-center lg:flex-row lg:space-x-8">
        {navItems.map((item, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={item.to}
              className="px-4 text-lg font-semibold text-white hover:text-gray-300 transition"
            >
              {t(item.label)}
            </NavLink>
          </li>
        ))}
      </ul>
      {!isLoggedin && (
        <ul className="font-medium flex flex-col justify-center items-center lg:flex-row lg:space-x-8">
          {authItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Button
                onClick={
                  item === "sign_up"
                    ? () => {
                        dispatch(setIsSignup(true));
                        dispatch(setToggle(false));
                        navigate("/");
                      }
                    : () => {
                        dispatch(setIsloggedin(true));
                        dispatch(setToggle(false));
                        navigate("/");
                      }
                }
                className={`px-6 lg:h-12 text-white font-semibold rounded-lg hover:bg-gray-300 transition ${
                  item === "log_in" ? "lg:border" : "lg:bg-primary"
                }`}
              >
                {t(item)}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavbarLinks;
