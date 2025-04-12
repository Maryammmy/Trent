import { Link } from "react-router-dom";
import { IProperty } from "../../../../interfaces/property/property";
import { truncateText } from "../../../../utils/truncateText";
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
  const [deleteProperty, setDeleteProperty] = useState(false);
  const { id, title, government_name, category_type, price, is_deleted } =
    property;
  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center bg-white shadow rounded-md p-4 sm:p-6 hover:bg-gray-100 transition">
        <p className="font-medium">{title}</p>
        <p className="font-medium hidden sm:block">
          {truncateText(government_name, 10)}
        </p>
        <p className="font-medium hidden sm:block">{category_type}</p>
        <p className="font-medium hidden sm:block">{price}EGP</p>
        <p
          className={`font-semibold ${
            is_deleted ? "text-green-600" : "text-red-600"
          }`}
        >
          {is_deleted ? t("publish") : t("unpublish")}
        </p>
        <div className="flex items-center sm:justify-center gap-2">
          <Link to={`/hosting/properties/${id}/update`}>
            <MdEdit size={25} className="text-primary" />
          </Link>
          <Button
            onClick={() => setDeleteProperty(true)}
            className={`${
              is_deleted ? "bg-green-600" : "bg-red-600"
            } text-white py-1 px-2 rounded-md font-medium`}
          >
            {is_deleted ? t("publish") : t("unpublish")}
          </Button>
        </div>
      </div>
      <PublishModal
        is_deleted={is_deleted}
        deleteProperty={deleteProperty}
        close={() => setDeleteProperty(false)}
        id={id}
      />
    </>
  );
};

export default Property;
