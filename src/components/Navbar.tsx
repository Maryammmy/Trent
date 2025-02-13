import Image from "./ui/Image";
import logo from "../assets/iamges/trentLogo.svg";
import { Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsloggedin, setIsSignup } from "../store/features/auth/authSlice";
import { NavbarSections } from "../data/landingData";
import Button from "./ui/Button";
import useScrollShadow from "../hooks/useScrollShadow";

const Navbar = () => {
  const { pathname } = useLocation();
  const { shadow } = useAppSelector((state) => state.categoryBar);
  const dispatch = useAppDispatch();
  useScrollShadow();
  return (
    <nav
      className={` top-0 left-0 w-full z-30 ${shadow ? "fixed" : "absolute"} ${
        pathname === "/" && !shadow ? "bg-transparent" : "bg-primary"
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
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span>
            <Menu />
          </span>
        </button>
        {NavbarSections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="hidden w-full lg:block lg:w-auto"
            id={section.id}
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {section.id === "auth-section" ? (
                    <Button
                      onClick={
                        item.label === "Log in"
                          ? () => dispatch(setIsloggedin(true))
                          : () => dispatch(setIsSignup(true))
                      }
                      className={`block text-lg text-center font-semibold ${
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
                      className="block text-lg text-center font-semibold home-navlink text-white md:p-0"
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
