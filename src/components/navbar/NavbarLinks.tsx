import { NavLink } from "react-router-dom";
import { navItems } from "../../data/landingData";

const NavbarLinks = () => {
  return (
    <ul className="font-medium flex flex-col justify-center items-center lg:flex-row lg:space-x-8">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.to}
            className="block text-lg mb-2 lg:mb-0 text-center font-semibold text-white"
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
