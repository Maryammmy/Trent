import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { X } from "lucide-react";
import mobile from "../../assets/iamges/mobileIsolated.png";
import Image from "../ui/Image";
import { buttonData } from "../../data/landingData";

function MobileAppModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    if (!sessionStorage.getItem("hasSeenMobileAppModal")) {
      setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenMobileAppModal", "true");
      }, 1000);
    }

    const userAgent = navigator.userAgent || navigator.vendor;
    setPlatform(
      /android/i.test(userAgent)
        ? "android"
        : /iPad|iPhone|iPod/i.test(userAgent)
        ? "ios"
        : "desktop"
    );
  }, []);

  return (
    <Modal isOpen={isOpen} close={() => setIsOpen(false)} maxWidth="600px">
      <div className="p-6 rounded-lg bg-primary">
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>
            <X className="text-white" />
          </Button>
        </div>
        <h2 className="text-white text-center font-semibold text-3xl pt-2">
          Get our Mobile App for a better experience!
        </h2>
        <div className="flex justify-center py-2">
          <Image imageUrl={mobile} alt="mobile" className="w-40 h-auto" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {buttonData
            .filter(
              (btn) => btn.platform === platform || platform === "desktop"
            )
            .map((btn, i) => (
              <Button
                key={i}
                className="bg-white text-primary rounded-md w-52 p-2 flex items-center gap-2"
              >
                <span>{btn.icon}</span>
                <span className="font-medium flex flex-col items-start">
                  <span>Download on the</span>
                  <span>{btn.label}</span>
                </span>
              </Button>
            ))}
        </div>
      </div>
    </Modal>
  );
}

export default MobileAppModal;
