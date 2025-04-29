import { Link } from "react-router-dom";
import { IProperty } from "../../../../interfaces/property";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import PublishModal from "./PublishModal";
interface IProps {
  property: IProperty;
}
const Property = ({ property }: IProps) => {
  const { t } = useTranslation();
  const [publishProperty, setPublishProperty] = useState(false);
  const {
    id,
    title,
    government_name,
    category_type,
    price,
    is_deleted,
    is_approved,
  } = property;
  const basePrice = parseInt(price);
  const statusText = is_deleted
    ? t("unpublish")
    : is_approved
    ? t("publish")
    : t("pending");

  const statusColor = is_deleted
    ? "text-red-600"
    : is_approved
    ? "text-green-600"
    : "text-dark";

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-center text-sm md:text-base bg-white shadow rounded-md p-4 sm:p-6 hover:bg-gray-100 transition">
        <p className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </p>
        <p className="font-medium hidden sm:block whitespace-nowrap overflow-hidden text-ellipsis">
          {government_name}
        </p>
        <p className="font-medium hidden sm:block whitespace-nowrap overflow-hidden text-ellipsis">
          {category_type}
        </p>
        <p className="font-medium hidden sm:block whitespace-nowrap overflow-hidden text-ellipsis">
          {basePrice} {t("price_per_night")}
        </p>
        <p className={`font-semibold ${statusColor}`}>{statusText}</p>
        {(is_approved || is_deleted) && (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/hosting/properties/${id}/update`}
              className="text-white py-2 w-24 rounded-md font-medium bg-primary flex justify-center items-center gap-1"
            >
              <MdEdit size={20} />
              <span>{t("edit")}</span>
            </Link>
            <Button
              onClick={() => setPublishProperty(true)}
              className={`${
                is_deleted ? "bg-green-600" : "bg-red-600"
              } text-white py-2 w-24 rounded-md font-medium`}
            >
              {is_deleted ? t("publish") : t("unpublish")}
            </Button>
          </div>
        )}
      </div>
      {publishProperty && (
        <PublishModal
          is_deleted={is_deleted}
          publishProperty={publishProperty}
          close={() => setPublishProperty(false)}
          id={id}
        />
      )}
    </>
  );
};

export default Property;
