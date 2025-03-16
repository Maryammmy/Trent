import { Link } from "react-router-dom";
import { IAccountSettings } from "../../interfaces/accountSettingsInterface";
import { useTranslation } from "react-i18next";

interface IProps {
  item: IAccountSettings;
}

function AccountSettingsCard({ item }: IProps) {
  const { icon, title, description, to } = item;
  const { t } = useTranslation();
  return (
    <Link
      to={to}
      className="p-4 flex-flex-col gap-2 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="pb-4">{icon}</div>
      <div>
        <h3 className="font-medium text-lg">{t(title)}</h3>
        <p className="text-dark font-medium">{t(description)}</p>
      </div>
    </Link>
  );
}

export default AccountSettingsCard;
