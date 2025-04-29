import Button from "@/components/ui/Button";
import { IPayoutProfile } from "@/interfaces/payouts";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DeletePayoutProfileModal from "./DeletePayoutProfileModal";

interface IProps {
  profile: IPayoutProfile;
}
function Booking({ profile }: IProps) {
  const [isDeletedModal, setIsDeletedModal] = useState(false);
  const { t } = useTranslation();
  const { bank_name, bank_account_number, wallet_number, profile_name, id } =
    profile;
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 border px-6 py-4 rounded-2xl">
        <div className="w-full sm:w-fit">
          <h3 className="hidden sm:block text-lg font-semibold">
            {bank_name && bank_name
              ? t("bank_account")
              : t("electronic_wallet")}
          </h3>
          <div className="flex sm:hidden justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              {bank_name && bank_name
                ? t("bank_account")
                : t("electronic_wallet")}
            </h3>
            <Button
              onClick={() => setIsDeletedModal(true)}
              className="flex items-center gap-1 font-medium text-red-600 p-2 rounded-full"
            >
              <Trash />
            </Button>
          </div>
          <div className="flex flex-col gap-1 font-medium">
            <h3>{profile_name}</h3>
            {bank_name && bank_account_number && (
              <span>
                {t("bank_name")} : {bank_name}
              </span>
            )}
            <p>
              {bank_account_number && bank_name
                ? `${t("bank_account_number")} : ${bank_account_number}`
                : `${t("wallet_number")} : ${wallet_number}`}
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsDeletedModal(true)}
          className="hidden sm:flex items-center gap-1 font-medium text-red-600 p-2 rounded-full"
        >
          <Trash />
        </Button>
      </div>
      {isDeletedModal && (
        <DeletePayoutProfileModal
          id={id}
          deleteProfile={isDeletedModal}
          close={() => setIsDeletedModal(false)}
        />
      )}
    </>
  );
}

export default Booking;
