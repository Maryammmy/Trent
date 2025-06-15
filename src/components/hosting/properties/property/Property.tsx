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
    is_need_review,
    is_published,
    is_approved,
  } = property;

  // Determine status text
  let statusText = "";
  let statusColor = "";
  let showEdit = false;
  let showPublishBtn = false;
  if (!is_approved && is_need_review) {
    // Case: Rejected
    statusText = t("rejected");
    statusColor = "text-red-600";
    showEdit = true;
  } else if (!is_approved && !is_need_review) {
    // Case: Pending Review (under review)
    statusText = t("pending");
    statusColor = "text-yellow-500";
    showEdit = false;
  } else if (is_approved && is_published) {
    // Case: Published
    statusText = t("publish");
    statusColor = "text-green-600";
    showEdit = true;
    showPublishBtn = true;
  } else if (is_approved && !is_published) {
    // Case: Unpublished
    statusText = t("unpublish");
    statusColor = "text-neutral-400";
    showEdit = true;
    showPublishBtn = true;
  }

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-center text-sm md:text-base min-h-20 sm:min-h-24 bg-white shadow rounded-md p-4 sm:p-6 hover:bg-gray-100 transition">
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
          {price} {t("EGP")}
        </p>
        <p className={`font-semibold ${statusColor}`}>{statusText}</p>

        <div className="flex flex-wrap items-center gap-3">
          {showEdit && (
            <Link
              to={`/hosting/properties/${id}/update`}
              className="text-white py-2 w-24 rounded-md font-medium bg-primary flex justify-center items-center gap-1"
            >
              <MdEdit size={20} />
              <span>{t("edit")}</span>
            </Link>
          )}

          {showPublishBtn && (
            <Button
              onClick={() => setPublishProperty(true)}
              className={`${
                is_published ? "bg-red-600" : "bg-green-600"
              } text-white py-2 w-24 rounded-md font-medium`}
            >
              {is_published ? t("unpublish") : t("publish")}
            </Button>
          )}
        </div>
      </div>

      {publishProperty && (
        <PublishModal
          is_published={is_published}
          publishProperty={publishProperty}
          close={() => setPublishProperty(false)}
          id={id}
        />
      )}
    </>
  );
};

export default Property;
