import { Toaster } from "react-hot-toast";
import router from "./router";
import { RouterProvider } from "react-router-dom";

import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import i18n from "./i18n";
import { useEffect } from "react";
import SidebarContextProvider from "./context/SidebarContext";

function App() {
  useEffect(() => {
    const updateDirection = () => {
      const direction = i18n.language === "ar" ? "rtl" : "ltr";
      document.documentElement.dir = direction;
    };
    i18n.on("languageChanged", updateDirection);
    updateDirection();
    return () => {
      i18n.off("languageChanged", updateDirection);
    };
  }, []);
  const { darkMode } = useSelector((state: RootState) => state.darkMode);
  return (
    <div className={darkMode ? "dark" : "light"}>
      <SidebarContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SidebarContextProvider>
    </div>
  );
}

export default App;
