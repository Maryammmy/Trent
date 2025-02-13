import Image from "./ui/Image";
import logo from "../assets/iamges/trentLogo.svg";
import { Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsloggedin, setIsSignup } from "../store/features/auth/authSlice";
import { NavbarSections } from "../data/landingData";
import Button from "./ui/Button";
import useNavbarBg from "../hooks/useNavbarBg";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();
  const { bg } = useAppSelector((state) => state.navbar);
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
  const renderSections = () => (
    <>
      {NavbarSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={`w-full lg:w-auto`} id={section.id}>
          <ul className="font-medium flex flex-col justify-center items-center lg:flex-row lg:space-x-8 rtl:lg:space-x-reverse">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {section.id === "auth-section" ? (
                  <Button
                    onClick={
                      item.label === "Log in"
                        ? () => dispatch(setIsloggedin(true))
                        : () => dispatch(setIsSignup(true))
                    }
                    className={`block text-lg text-center font-semibold mb-2 lg:mb-0 ${
                      item.label === "Log in"
                        ? "text-white border-2 border-white rounded-lg py-2 w-24"
                        : "bg-secondary text-white rounded-lg py-2 w-24"
                    } `}
                  >
                    <span> {item.label}</span>
                  </Button>
                ) : (
                  <NavLink
                    to={item.to}
                    className="block text-lg mb-2 lg:mb-0 text-center font-semibold home-navlink text-white"
                  >
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
  useNavbarBg();
  return (
    <nav
      className={` top-0 left-0 w-full z-30 fixed ${
        pathname === "/" && !bg ? "bg-transparent" : "bg-primary"
      }`}
    >
      <div className="max-w-[1450px] flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex flex-col items-center space-y-1 rtl:space-y-reverse"
        >
          <div className="">
            <Image
              imageUrl={logo}
              className="w-full h-full object-cover"
              alt="Trent Logo"
            />
          </div>
          <span className="text-xs text-white font-medium">
            Travel.rent.easy
          </span>
        </Link>
        <Button
          onClick={() => setToggle(!toggle)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-white rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span>
            <Menu className="text-dark" />
          </span>
        </Button>
        {isSmallScreen ? (
          <div
            className={`w-full py-2 bg-primary rounded-md ${
              toggle ? "block" : "hidden"
            }`}
          >
            {renderSections()}
          </div>
        ) : (
          renderSections()
        )}
      </div>
    </nav>
  );
};

export default Navbar;
