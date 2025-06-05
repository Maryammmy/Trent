import { X } from "lucide-react";
import { setIsFinishUpModal } from "../../store/features/becomeAHost/becomeAHostSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import Image from "../ui/Image";
import { useSendDataToAPI } from "../../services/addPropertyService";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { currentLanguage, ownerFees } from "@/constants";

function HostingModal() {
  const { t } = useTranslation();
  const { isFinishUpModal } = useAppSelector((state) => state.becomeAHost);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { sendDataToAPI } = useSendDataToAPI();
  const [storedPrice, setStoredPrice] = useState<string>("");
  const [storedTitleAr, setStoredTitleAr] = useState<string>("");
  const [storedTitleEn, setStoredTitleEn] = useState<string>("");
  const trentFees = ownerFees
    ? Math.round(Number(storedPrice) * (Number(ownerFees) / 100))
    : "";
  useEffect(() => {
    setStoredPrice(sessionStorage.getItem("price") || "");
    setStoredTitleAr(sessionStorage.getItem("title_ar") || "");
    setStoredTitleEn(sessionStorage.getItem("title_en") || "");
  }, []);
  const handleFinishUp = async () => {
    setLoading(true);
    const isSuccess = await sendDataToAPI();
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setIsFinishUpModal(false));
        window.location.reload();
      }, 500);
    }
    setLoading(false);
  };
  return (
    <Modal
      isOpen={isFinishUpModal}
      close={() => dispatch(setIsFinishUpModal(false))}
      maxWidth="500px"
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
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <Image
              imageUrl="/images/Trent-logo-pdf.png"
              alt="Property image"
              className="w-full h-full object-cover"
            />
          </div>
          <h5 className="font-semibold">
            {currentLanguage === "en" ? storedTitleEn : storedTitleAr}
          </h5>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span>🏡</span>
              <h6 className="font-medium">{t("rent_price")}:</h6>
              <span className="font-bold">
                {storedPrice} {t("EGP")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>💸</span>
              <h6 className="font-medium">{t("trent_fees")}:</h6>
              <span className="font-bold">
                ({ownerFees}%) {trentFees} {t("EGP")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 my-4">
          <Button
            onClick={handleFinishUp}
            className="text-white bg-primary py-2 w-28 rounded-md font-medium"
          >
            {loading ? <Loader /> : t("finish_up")}
          </Button>
          <Button
            type="button"
            onClick={() => dispatch(setIsFinishUpModal(false))}
            className="bg-gray-100 text-primary py-2 w-28 rounded-md font-medium"
          >
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default HostingModal;
