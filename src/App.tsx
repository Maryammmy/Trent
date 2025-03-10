import { Toaster } from "react-hot-toast";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import i18n from "./i18n";
import { useEffect, useState } from "react";
import { PhotoProvider } from "react-photo-view";
import FilterDataContextProvider from "./context/FilterDataContext";
import SystemLoader from "./components/loader/SystemLoader";

function App() {
  const [isMount, setIsMount] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMount(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
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
  if (isMount) {
    return <SystemLoader />;
  }
  return (
    <>
      <FilterDataContextProvider>
        <PhotoProvider>
          <RouterProvider router={router} />
          <Toaster />
        </PhotoProvider>
      </FilterDataContextProvider>
    </>
  );
}

export default App;
