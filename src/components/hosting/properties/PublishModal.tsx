import Loader from "@/components/loader/Loader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { publishPropertyAPI } from "@/services/propertyService";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
interface IProps {
  is_published: boolean;
  id: string;
  publishProperty: boolean;
  close: () => void;
}
function PublishModal({ is_published, id, publishProperty, close }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handlePublishProperty = async () => {
    try {
      setLoading(true);
      const response = await publishPropertyAPI(id);
      if (response?.data?.response_code === 200) {
        toast.success(response?.data?.response_message);
        setTimeout(() => {
          close();
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={publishProperty}
      close={close}
      title={is_published ? t("unpublish_property") : t("publish_property")}
      className="text-center font-bold text-2xl p-5 pb-0"
    >
      <div className="p-5">
        <p className="font-medium text-center">
          {is_published
            ? t("unpublish_property_desc")
            : t("publish_property_desc")}
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
              is_published
                ? "bg-red-600 hover:bg-red-600/80"
                : "bg-green-600 hover:bg-green-600/80"
            } font-medium text-white py-2 w-24 rounded-md`}
            onClick={handlePublishProperty}
          >
            {loading ? (
              <Loader />
            ) : is_published ? (
              t("unpublish")
            ) : (
              t("publish")
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default PublishModal;
