import React, { createContext, useState, useEffect, ReactNode } from "react";

interface NavbarContextType {
  shadow: boolean;
  setShadow: React.Dispatch<React.SetStateAction<boolean>>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
// eslint-disable-next-line react-refresh/only-export-components
export const NavbarContext = createContext({} as NavbarContextType);
const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [shadow, setShadow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavbarContext.Provider
      value={{
        setShadow,
        shadow,
        isDropdownOpen,
        setIsDropdownOpen,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;
