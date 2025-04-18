import { useTranslation } from "react-i18next";
import { languageOptions } from "../../data";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { setIsLangSwitcherOpen } from "../../store/features/homeSearch/homeSearchSlice";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    window.location.reload();
    dispatch(setIsLangSwitcherOpen(false));
  };

  return (
    <div
      className={`z-50 absolute top-6 sm:top-8 mt-2 min-w-24 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg ${
        document.documentElement.dir === "rtl" ? "left-0" : "right-0"
      }`}
    >
      <ul>
        {languageOptions.map((item, index) => {
          const { label, value } = item;
          return (
            <li key={index}>
              <Button
                onClick={() => changeLanguage(value)}
                className="block py-2 w-full text-center hover:bg-[#F7F7F7]"
              >
                <span>{label}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
