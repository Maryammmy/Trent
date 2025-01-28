import { Link } from "react-router-dom";
import { IAccountSettings } from "../../interfaces/accountSettingsInterface";

interface IProps {
  item: IAccountSettings;
}

function AccountSettingsCard({ item }: IProps) {
  const { icon, title, description, to } = item;
  return (
    <Link
      to={to}
      className="p-4 flex-flex-col gap-2 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="pb-4">{icon}</div>
      <div>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-secondary font-medium">{description}</p>
      </div>
    </Link>
  );
}

export default AccountSettingsCard;
