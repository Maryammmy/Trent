import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IHosting } from "@/interfaces/hosting";

interface IProps {
  item: IHosting;
}

function HostingCard({ item }: IProps) {
  const { to, label, icon, count } = item;
  const { t } = useTranslation();
  return (
    <Link to={to} className="p-6 rounded-lg shadow hover:shadow-md transition">
      <div className="pb-4">{icon}</div>
      <div>
        <h3 className="font-medium text-xl pb-1">{t(label)}</h3>
        <span className="font-medium text-lg">{count}</span>
      </div>
    </Link>
  );
}

export default HostingCard;
