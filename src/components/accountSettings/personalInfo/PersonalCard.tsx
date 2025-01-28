import { personalInfoCard } from "../../../data/accountSettingsData/personalInfoData";

function PersonalCard() {
  return (
    <div className="flex-1 border rounded-lg p-6 max-w-[400px]">
      {personalInfoCard.map((item, index) => {
        const { title, text, icon } = item;
        const border = index === personalInfoCard.length - 1 ? "" : "border-b";
        return (
          <div key={index} className={`flex flex-col gap-3 p-4 ${border}`}>
            <div>{icon}</div>
            <h2 className="font-bold text-xl">{title}</h2>
            <p className="text-secondary font-medium">{text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PersonalCard;
