import { useTranslation } from "react-i18next";
import Button from "./ui/Button";
import { languageOptions } from "@/data";
import { setIsLangSwitcherOpen } from "@/store/features/homeSearch/homeSearchSlice";
import { useAppDispatch } from "@/store/hooks";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setTimeout(() => {
      dispatch(setIsLangSwitcherOpen(false));
      window.location.reload();
    }, 500);
  };

  return (
    <div
      className={`font-medium absolute z-50 top-8 md:top-10 min-w-24 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg ${
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
