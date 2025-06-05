import Loader from "@/components/loader/Loader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deletePayoutsProfileAPI } from "@/services/payoutsService";
import { handleErrorMessage } from "@/utils/handleErrorMsg";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
interface IProps {
  id: string;
  deleteProfile: boolean;
  close: () => void;
}
function DeletePayoutProfileModal({ id, deleteProfile, close }: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await deletePayoutsProfileAPI(id);
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
      isOpen={deleteProfile}
      close={close}
      title={t("delete_payout_profile_title")}
      className="text-center font-bold text-2xl p-6 pb-0"
    >
      <div className="p-5 md:pb-8 pt-5 md:px-10">
        <p className="font-medium text-center">
          {t("delete_payout_profile_desc")}
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
            className="bg-red-600 font-medium hover:bg-red-600/80 text-white py-2 w-24 rounded-md"
            disabled={loading}
            onClick={handleDeleteAccount}
          >
            {loading ? <Loader /> : t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeletePayoutProfileModal;
