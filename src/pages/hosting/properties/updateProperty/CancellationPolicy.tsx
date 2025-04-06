import SelectSkeleton from "@/components/skeleton/SelectSkeleton";
import Button from "@/components/ui/Button";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import { ICancellationPolicy } from "@/interfaces/property/property";
import { PropertyNameInputs } from "@/types";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
interface IProps {
  isOpen: boolean;
  handleOnClick: () => void;
  cancellationPolicies: ICancellationPolicy[] | null;
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
}
function CancellationPolicy({
  isOpen,
  handleOnClick,
  cancellationPolicies,
  control,
  errors,
}: IProps) {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <label
        htmlFor="cancellation-policy"
        className="text-dark font-medium mb-2 block"
      >
        {t("cancellation_policy")}
      </label>
      {!cancellationPolicies ? (
        <SelectSkeleton />
      ) : (
        <Controller
          name="cancellation_policy_id"
          control={control}
          render={({ field }) => (
            <>
              <Button
                type="button"
                id="cancellation-policy"
                onClick={handleOnClick}
                className="w-full border bg-white py-3 px-2 rounded-md focus:border-2 focus:border-primary flex justify-between items-center"
              >
                <div className="flex flex-col items-start">
                  {field.value ? (
                    <span className="font-semibold">
                      {cancellationPolicies?.find(
                        (policy) => policy.id === field.value
                      )?.title || t("select_cancellation_policy")}
                    </span>
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
                        onClick={() => {
                          field.onChange(policy.id);
                          handleOnClick();
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">{policy.title}</span>
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
        />
      )}
      {errors["cancellation_policy_id"] && (
        <InputErrorMessage msg={errors["cancellation_policy_id"].message} />
      )}
    </div>
  );
}
export default CancellationPolicy;
