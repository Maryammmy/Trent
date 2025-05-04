import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/hooks";
import {
  setIsloggedin,
  setIsSignup,
} from "../../store/features/auth/authSlice";
import { setToggle } from "../../store/features/navbar/navbarSlice";
import { authItems } from "../../data";

const isLoggedin = Cookies.get("user_id");
const NavbarLinks = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    !isLoggedin && (
      <ul className="font-medium flex flex-col justify-center items-center lg:flex-row lg:gap-4">
        {authItems.map((item, index) => (
          <li key={index} className="mb-2 lg:mb-0">
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
              className={`px-6 lg:h-[42px] text-white font-semibold rounded-full border hover:bg-secondary transition`}
            >
              {t(item)}
            </Button>
          </li>
        ))}
      </ul>
    )
  );
};

export default NavbarLinks;
