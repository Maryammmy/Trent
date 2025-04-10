import Loader from "@/components/loader/Loader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ApiError } from "@/interfaces";
import { deletePropertyAPI } from "@/services/propertyService";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
interface IProps {
  id: string;
  deleteProperty: boolean;
  close: () => void;
}
const uid = Cookies.get("user_id") || "";
function DeleteModal({ id, deleteProperty, close }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handleDeleteProperty = async () => {
    try {
      setLoading(true);
      const response = await deletePropertyAPI({ uid, prop_id: id });
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        close();
        window.location.reload();
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
      isOpen={deleteProperty}
      close={close}
      title={t("delete_property")}
      className="text-center font-bold text-2xl pt-6"
    >
      <div className="p-6">
        <h3 className="font-medium">{t("delete_property_desc")}</h3>
        <div className="flex pt-5 justify-between space-x-3">
          <Button
            className="bg-primary font-medium hover:bg-primary/80 text-white py-2 w-24 rounded-md"
            type="button"
            onClick={close}
          >
            {t("cancel")}
          </Button>
          <Button
            className="bg-red-600 font-medium hover:bg-red-600/80 text-white py-2 w-24 rounded-md"
            onClick={handleDeleteProperty}
          >
            {loading ? <Loader /> : t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
