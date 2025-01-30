import { Menu } from "lucide-react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import DarkModeToggle from "../../DarkModeToggle";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

function Navbar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Button
              onClick={toggleSidebar}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden bg-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span>
                {" "}
                <Menu />
              </span>
            </Button>
            <Link to="/" className="flex ms-2 md:me-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Trent
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-4 ms-3">
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
