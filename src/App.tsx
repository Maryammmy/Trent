import { Toaster } from "react-hot-toast";
import router from "./router";
import { RouterProvider } from "react-router-dom";
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

  return (
    <>
      <SidebarContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SidebarContextProvider>
    </>
  );
}

export default App;
