import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { X } from "lucide-react";
import Image from "../ui/Image";
import { buttonData } from "../../data/landing";

function MobileAppModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setPlatform(
      /android/i.test(userAgent)
        ? "android"
        : /iPad|iPhone|iPod/i.test(userAgent)
        ? "ios"
        : "desktop"
    );

    if (
      (platform === "android" || platform === "ios") &&
      !sessionStorage.getItem("hasSeenMobileAppModal")
    ) {
      setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenMobileAppModal", "true");
      }, 1000);
    }
  }, [platform]);

  if (platform === "desktop") return null;

  return (
    <Modal isOpen={isOpen} close={() => setIsOpen(false)} maxWidth="600px">
      <div className="p-6 rounded-lg bg-primary" data-aos="fade-up">
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>
            <X className="text-white" />
          </Button>
        </div>
        <h2 className="text-white text-center font-semibold text-3xl pt-2">
          Get our Mobile App for a better experience!
        </h2>
        <div className="flex justify-center py-2">
          <Image
            imageUrl="/images/mobileIsolated.png"
            alt="mobile"
            className="w-40 h-full"
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          {buttonData
            .filter((btn) => btn.platform === platform)
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
