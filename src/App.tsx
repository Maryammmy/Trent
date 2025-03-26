import { Toaster } from "react-hot-toast";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import i18n from "./i18n";
import { Suspense, useEffect, useState } from "react";
import { PhotoProvider } from "react-photo-view";
import FilterDataContextProvider from "./context/FilterDataContext";
import SystemLoader from "./components/loader/SystemLoader";
import AOS from "aos";
import HostingContextProvider from "./context/HostingContext";
import AlertContextProvider from "./context/AlertContext";

function App() {
  AOS.init({
    duration: 1000,
    offset: 50,
    once: true,
  });

  const [isMount, setIsMount] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMount(false);
    }, 1000);

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
        <HostingContextProvider>
          <AlertContextProvider>
            <PhotoProvider>
              <Suspense fallback={<SystemLoader />}>
                <RouterProvider router={router} />
              </Suspense>
              <Toaster />
            </PhotoProvider>
          </AlertContextProvider>
        </HostingContextProvider>
      </FilterDataContextProvider>
    </>
  );
}

export default App;
