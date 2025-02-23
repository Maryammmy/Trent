import { menuItems } from "../../data";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { setIsDropdownOpen } from "../../store/features/homeSearch/homeSearchSlice";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    Cookies.remove("user_id");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div
        className={`z-50 hidden md:block absolute top-10 mt-2 min-w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 ${
          document.documentElement.dir === "rtl" ? "left-0" : "right-0"
        }`}
      >
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                item === "log_out" && "border-t"
              }`}
            >
              <Link
                onClick={
                  item === "log_out"
                    ? logout
                    : () => dispatch(setIsDropdownOpen(false))
                }
                to={item === "host_an_experience" ? "/become-a-host" : ""}
                className="w-full text-start"
              >
                <span>{t(item)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DropdownMenu;
