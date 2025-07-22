import { useEffect } from "react";

export default function Ios() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href =
        "https://apps.apple.com/us/app/trent-eg/id6744845845";
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return <></>;
}
