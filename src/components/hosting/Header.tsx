import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <div className="flex items-center justify-between px-5 xl:px-20 py-5 bg-primary">
      <Link to={"/"}>
        <h2 className="text-white text-4xl font-semibold">Trent</h2>
      </Link>
      <Link
        to={"/"}
        className="py-2 px-4 rounded-full border-2 flex justify-center items-center border-white font-medium text-white"
      >
        <span>{pathname === "/hosting" ? t("exit") : t("save_and_exit")}</span>
      </Link>
    </div>
  );
}

export default Header;
