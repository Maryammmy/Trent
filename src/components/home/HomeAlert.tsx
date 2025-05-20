import Alert from "../ui/Alert";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/context/AlertContext";
import SelectSkeleton from "../skeleton/SelectSkeleton";
import { useGetData } from "@/hooks/useGetData";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function HomeAlert() {
  const { setIsAlert } = useContext(AlertContext);
  const { data } = useGetData(
    ["alert"],
    `user_api/u_alert.php?lang=${currentLanguage}`
  );
  const alert = data?.data?.data?.alert_text;
  useEffect(() => {
    setIsAlert(alert);
  }, [alert, data, setIsAlert]);
  return alert === undefined ? (
    <SelectSkeleton />
  ) : alert ? (
    <Alert>{alert}</Alert>
  ) : null;
}

export default HomeAlert;
