import { preferencesData } from "../../../data/accountSettingsData/preferencesData";
import Button from "../../ui/Button";

function PreferencesData() {
  return (
    <div className="flex-[2]">
      {preferencesData.map((item, index) => {
        const { label, text, button } = item;
        return (
          <div key={index} className="border-b pb-8 pt-4 flex justify-between">
            <div>
              <h2 className="font-bold">{label}</h2>
              <p className=" text-secondary text-lg">{text}</p>
            </div>
            <div>
              <Button className="text-primary text-xl font-medium">
                {button}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PreferencesData;
