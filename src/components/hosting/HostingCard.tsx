import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IReportData } from "@/interfaces/dashboard";
import Image from "../ui/Image";
import { baseURL } from "@/services";
import { getLinkForTitle } from "@/utils/getLinkForTitle";

interface IProps {
  item: IReportData;
}

function HostingCard({ item }: IProps) {
  const { title, url, report_data } = item;
  const { t } = useTranslation();
  return (
    <Link
      to={getLinkForTitle(title)}
      className="p-6 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="w-12 h-12 rounded-md overflow-hidden">
        <Image
          imageUrl={baseURL + url}
          alt="hosting"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium text-xl pb-1 pt-4">{t(title)}</h3>
        <span className="font-medium text-lg">{report_data}</span>
      </div>
    </Link>
  );
}

export default HostingCard;
