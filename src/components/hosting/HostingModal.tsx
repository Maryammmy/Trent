import { X } from "lucide-react";
import { setIsFinishUpModal } from "../../store/features/becomeAHost/becomeAHostSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import Image from "../ui/Image";
import property from "../../assets/iamges/property.jpg";
import { Link } from "react-router-dom";
import { CurrentLanguage } from "../../interfaces";

const currentLanguage = localStorage.getItem("i18nextLng") as CurrentLanguage;
function HostingModal() {
  const { t } = useTranslation();
  const { isFinishUpModal, createdProperty } = useAppSelector(
    (state) => state.becomeAHost
  );
  const dispatch = useAppDispatch();
  return (
    <Modal
      isOpen={isFinishUpModal}
      close={() => dispatch(setIsFinishUpModal(false))}
      maxWidth="600px"
    >
      <div className="p-6">
        <div className="flex items-center justify-end">
          <Button
            onClick={() => dispatch(setIsFinishUpModal(false))}
            className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X strokeWidth={2.5} />
          </Button>
        </div>
        <h3 className="font-bold text-2xl text-center py-2">
          {t("become_a_host_finish_up")}
        </h3>
        <p className="text-center mx-auto text-dark font-medium pb-5 max-w-sm">
          {t("become_a_host_finish_up_desc")}
        </p>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-32 h-32 rounded-lg overflow-hidden">
            <Image
              imageUrl={property}
              alt="Property image"
              className="w-full h-full object-cover"
            />
          </div>
          <h5 className="font-semibold">
            {createdProperty?.title?.[currentLanguage]}
          </h5>
          <p className="text-dark max-w-sm">مساكن شيراتون, Cairo Governorate</p>
        </div>
        <div className="flex items-center justify-between my-4">
          <Button
            onClick={() => dispatch(setIsFinishUpModal(false))}
            className=" text-white bg-primary py-2 px-6 rounded-md font-medium"
          >
            {t("cancel")}
          </Button>
          <Link
            to={"/hosting/listings/1"}
            className="text-primary py-2 px-6 rounded-md font-medium hover:bg-gray-100"
          >
            {t("finish_up")}
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default HostingModal;
