import { useAlertAPI } from "@/services/homeService";
import Alert from "../ui/Alert";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/context/AlertContext";
import SelectSkeleton from "../skeleton/SelectSkeleton";

function HomeAlert() {
  const { setIsAlert } = useContext(AlertContext);
  const { data } = useAlertAPI();
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
