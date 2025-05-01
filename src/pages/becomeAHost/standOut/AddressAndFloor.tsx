import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";
import { useTranslateAPI } from "@/services/translateService";

function AddressAndFloor() {
  const { t } = useTranslation();
  const [addressAr, setAddressAr] = useState<string>("");
  const [addressEn, setAddressEn] = useState<string>("");
  const [floorAr, setFloorAr] = useState<string>("");
  const [floorEn, setFloorEn] = useState<string>("");
  const { data: translatedText } = useTranslateAPI(addressAr.trim());
  const { data: translatedFloor } = useTranslateAPI(floorAr.trim());

  useEffect(() => {
    setAddressAr(sessionStorage.getItem("address_ar") || "");
    setAddressEn(sessionStorage.getItem("address_en") || "");
    setFloorAr(sessionStorage.getItem("floor_ar") || "");
    setFloorEn(sessionStorage.getItem("floor_en") || "");
  }, []);
  useEffect(() => {
    const translated = translatedText?.data?.responseData?.translatedText;
    if (translated) {
      setAddressEn(translated);
      sessionStorage.setItem("address_en", translated);
    }
  }, [translatedText]);
  useEffect(() => {
    const translated = translatedFloor?.data?.responseData?.translatedText;
    if (translated) {
      setFloorEn(translated);
      sessionStorage.setItem("floor_en", translated);
    }
  }, [translatedFloor]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "address" | "floor",
    lang: "en" | "ar"
  ) => {
    const rawValue = e.target.value;
    const trimmedValue = rawValue.trim();
    const key: keyof typeof setters = `${type}_${lang}` as keyof typeof setters;
    const setters = {
      address_en: setAddressEn,
      address_ar: setAddressAr,
      floor_en: setFloorEn,
      floor_ar: setFloorAr,
    };
    setters[key](rawValue);
    if (trimmedValue.length > 0) {
      sessionStorage.setItem(key, trimmedValue);
    } else {
      sessionStorage.removeItem(key);
    }
  };

  const isNextDisabled =
    addressAr.trim().length < 5 ||
    addressEn.trim().length < 5 ||
    floorAr.trim().length < 1 ||
    floorEn.trim().length < 1;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("address_and_floor")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("address_and_floor_desc")}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium mb-1">
            {t("address_in_arabic")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="text"
            maxLength={100}
            minLength={5}
            onChange={(e) => handleInputChange(e, "address", "ar")}
            name="address_ar"
            value={addressAr}
            placeholder={t("address_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">
            {t("address_in_english")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="text"
            maxLength={100}
            minLength={5}
            onChange={(e) => handleInputChange(e, "address", "en")}
            name="address_en"
            value={addressEn}
            placeholder={t("address_placeholder_en")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium">
            {t("floor_in_arabic")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="text"
            min={0}
            onChange={(e) => handleInputChange(e, "floor", "ar")}
            name="floor_ar"
            value={floorAr}
            placeholder={t("floor_placeholder_ar")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">
            {t("floor_in_english")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="text"
            min={0}
            onChange={(e) => handleInputChange(e, "floor", "en")}
            name="floor_en"
            value={floorEn}
            placeholder={t("floor_placeholder_en")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "88.88%", "0px"]} />
      <BackAndNext
        back="/become-a-host/compound"
        next="/become-a-host/finish-setup"
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}

export default AddressAndFloor;
