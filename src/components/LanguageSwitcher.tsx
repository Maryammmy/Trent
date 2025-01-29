import { useTranslation } from "react-i18next";
import { languageOptions } from "../data";
import Button from "./ui/Button";
import { useAppDispatch } from "../store/hooks";
import { setIsLangSwitcherOpen } from "../store/features/homeSearch/homeSearchSlice";
import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const languageSwitcherRef = useRef<HTMLDivElement>(null);
  useClickOutside(languageSwitcherRef, () =>
    dispatch(setIsLangSwitcherOpen(false))
  );
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(setIsLangSwitcherOpen(false));
  };

  return (
    <div
      ref={languageSwitcherRef}
      className={`z-50 absolute hidden xl:block top-10 mt-2 w-20 bg-white border border-gray-300 rounded-lg shadow-lg ${
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
                className="block px-4 py-2 text-left hover:bg-[#F7F7F7]"
              >
                {label}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
