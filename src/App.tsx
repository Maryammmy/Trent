import { Toaster } from "react-hot-toast";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import i18n from "./i18n";
import { useEffect } from "react";
import { PhotoProvider } from "react-photo-view";

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
      <PhotoProvider>
        <RouterProvider router={router} />
        <Toaster />
      </PhotoProvider>
    </>
  );
}

export default App;
