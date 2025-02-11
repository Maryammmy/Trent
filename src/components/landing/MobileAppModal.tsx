import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { X } from "lucide-react";
import mobile from "../../assets/iamges/mobileIsolated.png";
import Image from "../ui/Image";
import { buttonData } from "../../data/landingData";

function MobileAppModal() {
  const [isOpenMobileAppModal, setIsOpenMobileAppModal] = useState(false);
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenMobileAppModal");

    if (!hasSeenModal) {
      const timeout = setTimeout(() => {
        setIsOpenMobileAppModal(true);
        sessionStorage.setItem("hasSeenMobileAppModal", "true");
      }, 1000);

      return () => clearTimeout(timeout);
    }

    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      setPlatform("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform("ios");
    } else {
      setPlatform("desktop");
    }
  }, []);

  const renderButtons = () => {
    return buttonData
      .filter(
        (button) => platform === "desktop" || button.platform === platform
      )
      .map((button, index) => (
        <Button
          key={index}
          className="text-primary bg-white w-52 py-1 px-2 rounded-md flex"
        >
          <div className="flex justify-center items-center gap-2">
            <span>{button.icon}</span>
            <div className="font-medium flex flex-col items-start">
              <span>Download on the</span>
              <span>{button.label}</span>
            </div>
          </div>
        </Button>
      ));
  };

  return (
    <Modal
      isOpen={isOpenMobileAppModal}
      close={() => setIsOpenMobileAppModal(false)}
      maxWidth="600px"
    >
      <div className="p-6 rounded-lg bg-primary">
        <div className="flex justify-end items-center">
          <Button onClick={() => setIsOpenMobileAppModal(false)}>
            <span>
              <X className="text-white" />
            </span>
          </Button>
        </div>
        <h2 className="text-white font-semibold text-3xl pt-5">
          Get our Mobile App for a better experience!
        </h2>
        <div className="flex justify-center py-2">
          <div className="w-[200px] h-[250px]">
            <Image imageUrl={mobile} alt="mobile" className="w-full h-full" />
          </div>
        </div>
        <div
          className={`flex flex-col lg:flex-row gap-5 items-center pt-5 ${
            platform === "desktop" ? "justify-between" : "justify-center"
          }`}
        >
          {renderButtons()}
        </div>
      </div>
    </Modal>
  );
}
export default MobileAppModal;
