import React, { createContext, useState, ReactNode } from "react";

interface IAlertContext {
  isAlert: string | undefined;
  setIsAlert: React.Dispatch<React.SetStateAction<string | undefined>>;
}
// eslint-disable-next-line react-refresh/only-export-components
export const AlertContext = createContext({} as IAlertContext);
const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAlert, setIsAlert] = useState<string | undefined>("");

  return (
    <AlertContext.Provider
      value={{
        isAlert,
        setIsAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
