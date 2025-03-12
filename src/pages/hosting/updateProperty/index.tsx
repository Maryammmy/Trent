import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { usePropertyAPI } from "../../../services/propertyService";
import UpdateSkeleton from "../../../components/skeleton/UpdateSkeleton";
import AuthorizationCheck from "./AuthorizationCheck";
import UpdatePropertyForm from "./UpdatePropertyForm";

const userId = Cookies.get("user_id");

function UpdateProperty() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = usePropertyAPI(id || "");
  const owner: string = data?.data?.data?.property_details?.user_id;

  return (
    <>
      <AuthorizationCheck owner={owner} userId={userId} />
      <div className="bg-update-property bg-fixed bg-cover bg-no-repeat min-h-screen">
        <div className="max-w-screen-md py-5 md:py-10 px-5 2xl:px-20">
          <h2 className="font-semibold text-xl md:text-3xl py-8 text-white">
            {t("update_Property")}
          </h2>
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
