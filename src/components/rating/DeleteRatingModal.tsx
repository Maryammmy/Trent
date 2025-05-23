import { useState } from "react";
import Modal from "../ui/Modal";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import Loader from "../loader/Loader";
import { deleteRatingAPI } from "@/services/ratingService";
import toast from "react-hot-toast";
import { ApiError } from "@/interfaces";

interface IProps {
  isOpen: boolean;
  close: () => void;
  id: string;
}
function DeleteRatingModal({ isOpen, close, id }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handleDeleteRating = async () => {
    try {
      setLoading(true);
      const response = await deleteRatingAPI(id);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        setTimeout(() => {
          close();
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={t("delete_review")}
      className="text-center font-bold text-2xl pt-5"
    >
      <div className="p-6">
        <p className="font-medium text-center">{t("delete_review_desc")}</p>
        <div className="flex pt-5 justify-between space-x-3">
          <Button
            className="bg-primary font-medium hover:bg-primary/80 text-white py-2 w-24 rounded-md"
            type="button"
            onClick={close}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleDeleteRating}
            className="bg-red-600 font-medium hover:bg-red-600/80 text-white py-2 w-24 rounded-md"
            disabled={loading}
          >
            {loading ? <Loader /> : t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteRatingModal;
