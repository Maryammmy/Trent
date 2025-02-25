import { useState } from "react";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import { useGetData } from "../../../hooks/useGetData";
import { IFacility } from "../../../interfaces/landingInterface";
import { Home } from "lucide-react";
import PropertyTypeSkeleton from "../../../components/skeleton/propertyTypeSkeleton";

const currentLanguage = localStorage.getItem("i18nextLng");
const storedFacilities = sessionStorage.getItem("facility");

function Facilities() {
  const { t } = useTranslation();
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    storedFacilities ? JSON.parse(storedFacilities) : []
  );
  const { data } = useGetData(
    ["facilities"],
    `user_api/u_facility.php?lang=${currentLanguage}`
  );
  const facilities: IFacility[] = data?.data?.facilitylist;
  const handleSelectedFacilities = (id: string) => {
    setSelectedFacilities((prev) => {
      const updatedFacilities = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      sessionStorage.setItem("facility", JSON.stringify(updatedFacilities));
      return updatedFacilities;
    });
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-5 md:pb-10">
          {t("tell_us_about_amenities")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* {amenities.map((item, index) => {
            const idx = index + 1;
            const { text, icon } = item;
            const isSelected = selectedFacilities.includes(text);
            return (
              <Button
                key={idx}
                onClick={() => handleSelectedFacilities(text)}
                className={`flex flex-col justify-center gap-1 p-4 border rounded-lg min-h-28 bg-white ${
                  isSelected ? "bg-zinc-50 border-2 border-black" : ""
                }`}
              >
                <span>{icon}</span>
                <p className="font-medium text-lg text-start">{text}</p>
              </Button>
            );
          })} */}
          {!facilities ? (
            <PropertyTypeSkeleton cards={8} />
          ) : facilities?.length ? (
            facilities?.map((item, index) => {
              const { title, id } = item;
              return (
                <Button
                  key={index}
                  onClick={() => handleSelectedFacilities(id)}
                  className={`flex flex-wrap gap-2 font-medium border rounded-full py-2 px-3 ${
                    selectedFacilities.includes(id) && "bg-zinc-50 border-black"
                  }`}
                >
                  <span>{title}</span>
                  <span>
                    <Home />
                  </span>
                </Button>
              );
            })
          ) : (
            <div className="flex justify-center items-center text-dark font-medium w-full">
              No facilities found
            </div>
          )}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "20%", "0px"]} />
      <BackAndNext
        back="/become-a-host/stand-out"
        next="/become-a-host/images"
        isNextDisabled={!selectedFacilities.length}
      />
    </div>
  );
}

export default Facilities;
