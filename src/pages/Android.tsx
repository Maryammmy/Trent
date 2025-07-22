import { useEffect } from "react";

function Android() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.catlyst.trent";
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return <></>;
}

export default Android;
