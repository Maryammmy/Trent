import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UpdateSkeleton from "@/components/skeleton/UpdateSkeleton";
import { usePropertyAPI } from "@/services/propertyService";
import { currentLanguage, uid } from "@/constants";
import UpdatePropertyForm from "@/components/hosting/properties/updateProperty/UpdatePropertyForm";
import AuthorizationCheck from "@/components/hosting/properties/updateProperty/AuthorizationCheck";

function UpdateProperty() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = usePropertyAPI(id || "");
  const owner: string = data?.data?.data?.property_details?.owner_id;
  return (
    <>
      <AuthorizationCheck owner={owner} userId={uid} />
      <div className="bg-stone-100 bg-fixed bg-cover bg-no-repeat min-h-screen">
        <div className=" max-w-screen-2xl mx-auto py-5 md:py-10 px-5 xl:px-20">
          <div className="flex gap-3 items-center pb-5">
            <Link to="/hosting/properties">
              {currentLanguage === "en" ? (
                <ChevronLeft className="text-primary" />
              ) : (
                <ChevronRight className="text-primary" />
              )}
            </Link>
            <h2 className="font-semibold text-xl md:text-3xl text-primary">
              {t("update_Property")}
            </h2>
          </div>
          {data ? (
            <UpdatePropertyForm
              propertyData={data?.data?.data}
              userId={uid}
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
