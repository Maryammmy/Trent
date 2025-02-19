import logo from "../../assets/iamges/trentLogo.svg";
import { Link } from "react-router-dom";
import Image from "../ui/Image";

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex flex-col items-center space-y-1">
      <Image
        imageUrl={logo}
        className="w-full h-full object-cover"
        alt="Trent Logo"
      />
      <span className="text-xs text-white font-medium">Travel.rent.easy</span>
    </Link>
  );
};

export default NavbarLogo;
