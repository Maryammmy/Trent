import Image from "./ui/Image";
import logo from "../assets/iamges/trentLogo.svg";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
const navItems = [
  { label: "Home", href: "#", isActive: true },
  { label: "About Us", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];
const authItems = [
  { label: "Log in", href: "#", isPrimary: true },
  { label: "Sign up", href: "#" },
];
const sections = [
  { id: "nav-section", items: navItems },
  { id: "auth-section", items: authItems },
];
const Navbar = () => {
  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-20">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image imageUrl={logo} className="h-8" alt="Flowbite Logo" />
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span>
            <Menu />
          </span>
        </button>
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="hidden w-full md:block md:w-auto"
            id={section.id}
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <NavLink
                    to={item.href}
                    className={`block text-lg text-center font-semibold ${
                      item.label === "Log in"
                        ? "text-secondary border-2 border-secondary rounded-lg py-2 w-24"
                        : item.label === "Sign up"
                        ? "bg-secondary text-white rounded-lg py-2 w-24"
                        : "text-white md:p-0"
                    } `}
                  >
                    {item.label}
                  </NavLink>
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
