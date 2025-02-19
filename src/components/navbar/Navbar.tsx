import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarButtons from "./NavbarButtons";
import useNavbarBg from "../../hooks/useNavbarBg";
import Button from "../ui/Button";
import { Menu } from "lucide-react";
import { useAppSelector } from "../../store/hooks";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
  const { bg } = useAppSelector((state) => state.navbar);
  useNavbarBg();
  return (
    <nav
      className={`top-0 left-0 w-full z-30 fixed ${
        pathname === "/" && !bg ? "bg-transparent absolute" : "bg-primary"
      }`}
    >
      <div className="max-w-[1450px] flex flex-wrap items-center justify-between mx-auto p-4">
        <NavbarLogo />
        <Button
          onClick={() => setToggle(!toggle)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-white rounded-lg lg:hidden"
        >
          <Menu className="text-dark" />
        </Button>
        {isSmallScreen ? (
          <div
            className={`w-full py-2 bg-primary rounded-md ${
              toggle ? "block" : "hidden"
            }`}
          >
            <NavbarLinks />
          </div>
        ) : (
          <NavbarLinks />
        )}
        <NavbarButtons />
      </div>
    </nav>
  );
};

export default Navbar;
