import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { menuItems } from "@/data";
import { setIsDropdownOpen } from "@/store/features/homeSearch/homeSearchSlice";
import { useAppDispatch } from "@/store/hooks";
function DropdownMenu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    Cookies.remove("user_id");
    Cookies.remove("owner_fees");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div
        className={`font-medium absolute z-50 top-12 min-w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 ${
          document.documentElement.dir === "rtl" ? "left-0" : "right-0"
        }`}
      >
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const { label, to } = item;
            return (
              <li
                key={index}
                className={`flex flex-col  ${
                  label === "log_out" && "border-t"
                }`}
              >
                <Link
                  onClick={
                    label === "log_out"
                      ? logout
                      : () => dispatch(setIsDropdownOpen(false))
                  }
                  to={to}
                  className="text-start hover:bg-gray-100 px-4 py-2"
                >
                  <span>{t(label)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default DropdownMenu;
