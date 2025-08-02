import { useTranslation } from "react-i18next";
import { ICompound } from "../../../interfaces";
import Select from "../../ui/Select";
interface IProps {
  handleCompoundChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  compounds: ICompound[] | undefined;
  compound: string;
}
function CompoundFilter({ handleCompoundChange, compounds, compound }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 pb-4">
      <label className="text-lg font-bold">{t("compound")}</label>
      {!compounds ? (
        <p className="border py-3 px-2 rounded-md bg-white">
          {t("choose_government_to_continue")}
        </p>
      ) : compounds?.length ? (
        <Select
          value={compound}
          onChange={handleCompoundChange}
          options={compounds?.map((compound) => ({
            value: compound?.id,
            label: compound?.name,
          }))}
          className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">
          {t("no_compound_found")}
        </p>
      )}
    </div>
  );
}

export default CompoundFilter;
