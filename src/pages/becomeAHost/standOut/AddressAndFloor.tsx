import { useTranslation } from "react-i18next";
import { useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";

const storedAddressAr = sessionStorage.getItem("address_ar") || "";
const storedAddressEn = sessionStorage.getItem("address_en") || "";
const storedFloorAr = sessionStorage.getItem("floor_ar") || "";
const storedFloorEn = sessionStorage.getItem("floor_en") || "";

function AddressAndFloor() {
  const { t } = useTranslation();
  const [addressAr, setAddressAr] = useState<string>(storedAddressAr);
  const [addressEn, setAddressEn] = useState<string>(storedAddressEn);
  const [floorAr, setFloorAr] = useState<string>(storedFloorAr);
  const [floorEn, setFloorEn] = useState<string>(storedFloorEn);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "address" | "floor",
    lang: "en" | "ar"
  ) => {
    const newValue = e.target.value;
    if (type === "address") {
      if (lang === "en") {
        setAddressEn(newValue);
        sessionStorage.setItem("address_en", newValue);
      } else {
        setAddressAr(newValue);
        sessionStorage.setItem("address_ar", newValue);
      }
    } else {
      if (lang === "en") {
        setFloorEn(newValue);
        sessionStorage.setItem("floor_en", newValue);
      } else {
        setFloorAr(newValue);
        sessionStorage.setItem("floor_ar", newValue);
      }
    }
  };

  const isNextDisabled =
    addressAr.length < 5 ||
    addressEn.length < 5 ||
    floorAr.length < 1 ||
    floorEn.length < 1;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("address_and_floor")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("address_and_floor_desc")}
        </p>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("address_in_english")}</label>
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
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium mb-1">{t("address_in_arabic")}</label>
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
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("floor_in_english")}</label>
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
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("floor_in_arabic")}</label>
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
