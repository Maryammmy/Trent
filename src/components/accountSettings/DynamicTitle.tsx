import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
}
function DynamicTitle({ title }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-stone-700 text-2xl md:text-4xl font-bold">
        {t(title)}
      </h2>
    </div>
  );
}

export default DynamicTitle;
