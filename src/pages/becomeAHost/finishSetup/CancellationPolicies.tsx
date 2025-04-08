import { useCancellationPoliciesAPI } from "@/services/conditionService";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/ui/Button";
import SelectSkeleton from "@/components/skeleton/SelectSkeleton";
import { useTranslation } from "react-i18next";
import { ICancellationPolicy } from "@/interfaces/property/property";

interface IProps {
  selectedPolicy: ICancellationPolicy | "";
  isOpen: boolean;
  handleOnClick: () => void;
  handleChangePolicy(policy: ICancellationPolicy): void;
}

function CancellationPolicy({
  selectedPolicy,
  isOpen,
  handleOnClick,
  handleChangePolicy,
}: IProps) {
  const { t } = useTranslation();
  const { data } = useCancellationPoliciesAPI();
  const cancellationPolicies: ICancellationPolicy[] =
    data?.data?.data?.cancellation_policies_list;

  return (
    <div className="relative mb-5">
      <label htmlFor="cancellation-policy" className="font-medium mb-1 block">
        {t("cancellation_policy")}
      </label>
      {!cancellationPolicies ? (
        <SelectSkeleton />
      ) : (
        <>
          <p className="font-medium mb-2">{t("cancellation_policy_help")}</p>
          <Button
            id="cancellation-policy"
            onClick={handleOnClick}
            className="w-full border border-dark bg-zinc-50 py-3 px-2 rounded-md focus:border-2 focus:border-primary flex justify-between items-center"
          >
            <div className="flex flex-col items-start">
              {selectedPolicy ? (
                <>
                  <span className="font-semibold">{selectedPolicy?.title}</span>
                </>
              ) : (
                t("select_cancellation_policy")
              )}
            </div>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>
          {isOpen && (
            <div className="absolute w-full mt-1 bg-white border border-dark rounded-md shadow-md max-h-60 overflow-y-auto z-10">
              {cancellationPolicies?.length ? (
                cancellationPolicies?.map((policy) => (
                  <div
                    key={policy.id}
                    className="p-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => handleChangePolicy(policy)}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">{policy?.title}</span>
                      <span className="text-sm text-gray-600">
                        {policy.description}
                      </span>
                      {policy.is_recommended && (
                        <span className="text-xs text-green-600 font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-3 text-gray-500">
                  No cancellation policy found
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CancellationPolicy;
