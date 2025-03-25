import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import { Home } from "lucide-react";
import PropertyTypeSkeleton from "../../../components/skeleton/propertyTypeSkeleton";
import { IFacility } from "../../../interfaces";
import { useFacilitiesAPI } from "../../../services/filtersService";

function Facilities() {
  const { t } = useTranslation();
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  useEffect(() => {
    setSelectedFacilities(
      sessionStorage.getItem("facilities")
        ? JSON.parse(sessionStorage.getItem("facilities") || "")
        : []
    );
  }, []);
  const { data } = useFacilitiesAPI();
  const facilities: IFacility[] = data?.data?.data?.facility_list;
  const handleSelectedFacilities = (id: number) => {
    setSelectedFacilities((prev) => {
      const updatedFacilities = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      sessionStorage.setItem("facilities", JSON.stringify(updatedFacilities));
      return updatedFacilities;
    });
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-5 md:pb-10">
          {t("tell_us_about_amenities")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {!facilities ? (
            <PropertyTypeSkeleton cards={8} />
          ) : facilities?.length ? (
            facilities?.map((item, index) => {
              const { title, id } = item;
              return (
                <Button
                  key={index}
                  onClick={() => handleSelectedFacilities(Number(id))}
                  className={`flex flex-wrap gap-2 font-medium border rounded-full py-2 px-3 ${
                    selectedFacilities.includes(Number(id)) &&
                    "bg-zinc-50 border-black"
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
            <div className="col-span-full flex justify-center items-center text-dark font-medium w-full">
              No facilities found
            </div>
          )}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "11.11%", "0px"]} />
      <BackAndNext
        back="/become-a-host/stand-out"
        next="/become-a-host/images"
        isNextDisabled={!selectedFacilities.length}
      />
    </div>
  );
}

export default Facilities;
