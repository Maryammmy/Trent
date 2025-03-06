import { useTranslation } from "react-i18next";
import { ICompound } from "../../../interfaces";
import SelectSkeleton from "../../skeleton/SelectSkeleton";
import Select from "../../ui/Select";
interface IProps {
  handleCompoundChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  compounds: ICompound[];
}
function CompoundFilter({ handleCompoundChange, compounds }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 pb-4">
      <label className="text-lg font-bold">{t("compound")}</label>
      {!compounds ? (
        <SelectSkeleton />
      ) : compounds?.length ? (
        <Select
          onChange={handleCompoundChange}
          options={compounds?.map((compound) => ({
            value: compound?.id,
            label: compound?.name,
          }))}
          className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">
          No compound found
        </p>
      )}
    </div>
  );
}

export default CompoundFilter;
