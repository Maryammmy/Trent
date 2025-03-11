import Image from "../ui/Image";
import { useTranslation } from "react-i18next";
import { IDetailsProperty } from "../../interfaces/propertyInterface";
import { baseURL } from "../../services";
interface IProps {
  host: IDetailsProperty["owner"];
  guestRules: string;
}
function HostedBy({ host, guestRules }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="border-t border-b py-4">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            imageUrl={baseURL + host?.img}
            alt="User Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold">
            {t("hosted_by")} {host?.name}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-1 pt-4">
        <h3 className="font-bold">{t("host_rules")}</h3>
        <p className="text-dark font-medium">{guestRules}</p>
      </div>
    </div>
  );
}

export default HostedBy;
