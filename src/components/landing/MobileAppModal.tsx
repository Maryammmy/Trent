import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { X } from "lucide-react";

function MobileAppModal() {
  const [isOpenMobileAppModal, setIsOpenMobileAppModal] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpenMobileAppModal(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Modal
      isOpen={isOpenMobileAppModal}
      close={() => setIsOpenMobileAppModal(false)}
      maxWidth="600px"
    >
      <div className="p-6">
        <div className="flex justify-end items-center">
          <Button onClick={() => setIsOpenMobileAppModal(false)}>
            <span>
              <X />
            </span>
          </Button>
        </div>
        <h2 className="text-primary font-semibold text-3xl pt-5">
          Get our Mobile App for a better experience!
        </h2>
        <div className="flex flex-col md:flex-row gap-5 justify-between pt-5">
          <Button className="text-white bg-black w-48 py-1 px-1 rounded-md flex">
            <div className=" font-medium flex flex-col items-start">
              <span>Get It ON</span>
              <span>Google Play</span>
            </div>
          </Button>
          <Button className="text-white bg-black w-48 py-1 px-1 rounded-md flex">
            <div className=" font-medium flex flex-col items-start">
              <span>Download on the</span>
              <span>App Store</span>
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default MobileAppModal;
