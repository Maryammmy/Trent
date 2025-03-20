import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { usePropertyAPI } from "../../../services/propertyService";
import UpdateSkeleton from "../../../components/skeleton/UpdateSkeleton";
import AuthorizationCheck from "./AuthorizationCheck";
import UpdatePropertyForm from "./UpdatePropertyForm";
import { ChevronLeft } from "lucide-react";

const userId = Cookies.get("user_id");

function UpdateProperty() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = usePropertyAPI(id || "");
  const owner: string = data?.data?.data?.property_details?.owner_id;
  return (
    <>
      <AuthorizationCheck owner={owner} userId={userId} />
      <div className="bg-update-property bg-fixed bg-cover bg-no-repeat min-h-screen">
        <div className="max-w-screen-md py-5 md:py-10 px-5 2xl:px-20">
          <div className="flex gap-3 items-center pb-5">
            <Link to="/hosting/properties">
              <ChevronLeft />
            </Link>
            <h2 className="font-semibold text-xl md:text-3xl text-white">
              {t("update_Property")}
            </h2>
          </div>
          {data ? (
            <UpdatePropertyForm
              propertyData={data?.data?.data}
              userId={userId}
              propertyId={id}
            />
          ) : (
            <UpdateSkeleton cards={12} />
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateProperty;
