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
  is_deleted: boolean;
  id: string;
  deleteProperty: boolean;
  close: () => void;
}
const uid = Cookies.get("user_id") || "";
function PublishModal({ is_deleted, id, deleteProperty, close }: IProps) {
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
      title={is_deleted ? t("publish_property") : t("unpublish_property")}
      className="text-center font-bold text-2xl pt-5"
    >
      <div className="p-5">
        <p className="font-medium">
          {is_deleted
            ? t("publish_property_desc")
            : t("unpublish_property_desc")}
        </p>
        <div className="flex pt-5 justify-between space-x-3">
          <Button
            className="bg-primary font-medium hover:bg-primary/80 text-white py-2 w-24 rounded-md"
            type="button"
            onClick={close}
          >
            {t("cancel")}
          </Button>
          <Button
            disabled={loading}
            className={`${
              is_deleted
                ? "bg-green-600 hover:bg-green-600/80"
                : "bg-red-600 hover:bg-red-600/80"
            } font-medium text-white py-2 w-24 rounded-md`}
            onClick={handleDeleteProperty}
          >
            {loading ? <Loader /> : is_deleted ? t("publish") : t("unpublish")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default PublishModal;
