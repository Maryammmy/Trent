import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import Input from "../../../components/ui/Input";

function Location() {
  const { t } = useTranslation();
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setGoogleMapsUrl(sessionStorage.getItem("maps_url") || "");
  }, []);
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setGoogleMapsUrl(url);

    const isValidUrl =
      url.startsWith("https://www.google.com/maps") ||
      url.startsWith("https://maps.app.goo.gl/");
    setError(isValidUrl ? "" : t("invalid_google_maps_url"));

    if (isValidUrl) {
      sessionStorage.setItem("maps_url", JSON.stringify(url));
    }
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("location_of_place")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("location_of_place_desc")}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">
            {t("google_maps_url")}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <Input
            dir="ltr"
            type="text"
            value={googleMapsUrl}
            onChange={handleUrlChange}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            placeholder={t("enter_google_maps_url_placeholder")}
          />
          {error && <p className="text-red-600 text-xs md:text-sm">{error}</p>}
        </div>
      </div>

      <ProgressBarsWrapper progressBarsData={["75%", "0px", "0px"]} />
      <BackAndNext
        back="/become-a-host/floor-plan"
        next="/become-a-host/stand-out"
        isNextDisabled={!googleMapsUrl || !!error}
      />
    </div>
  );
}

export default Location;
