import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarButtons from "./NavbarButtons";
import useNavbarBg from "../../hooks/useNavbarBg";
import Button from "../ui/Button";
import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setToggle } from "../../store/features/navbar/navbarSlice";
import { useContext } from "react";
import { AlertContext } from "@/context/AlertContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
  const { bg, toggle } = useAppSelector((state) => state.navbar);
  const { isAlert } = useContext(AlertContext);
  const dispatch = useAppDispatch();
  useNavbarBg();

  return (
    <nav
      className={`left-0 w-full z-[2000] fixed ${
        pathname === "/" && !bg
          ? `bg-transparent absolute ${
              isAlert || isAlert === undefined ? "top-10" : "top-0"
            }`
          : "bg-primary top-0"
      }`}
    >
      <div className="max-w-[1450px] flex flex-wrap items-center justify-between mx-auto p-4">
        <NavbarLogo />
        {isSmallScreen ? (
          <>
            <div className="flex items-center gap-3 sm:gap-5">
              <NavbarButtons />
              <Button
                onClick={() => dispatch(setToggle(!toggle))}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-white rounded-lg lg:hidden"
              >
                <Menu className="text-dark" />
              </Button>
            </div>
            <div
              className={`w-full py-2 rounded-md bg-primary ${
                toggle ? "block" : "hidden"
              }`}
            >
              <NavbarLinks />
            </div>
          </>
        ) : (
          <>
            <NavbarLinks />
            <NavbarButtons />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
