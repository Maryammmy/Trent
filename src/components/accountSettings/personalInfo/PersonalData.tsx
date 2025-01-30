import { personalInfoData } from "../../../data/accountSettingsData/personalInfoData";
import Button from "../../ui/Button";

function PersonalData() {
  return (
    <div className="flex-[2]">
      {personalInfoData.map((item, index) => {
        const { label, text, button } = item;
        return (
          <div key={index} className="border-b pb-8 pt-4 flex justify-between">
            <div>
              <h2 className="font-bold">{label}</h2>
              <p className=" text-secondary">{text}</p>
            </div>
            <div>
              <Button className=" underline font-medium">
                <span>{button}</span>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PersonalData;
