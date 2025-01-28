import { SlidersVertical } from "lucide-react";

function preferencesCard() {
  return (
    <div className="flex-1">
      <div className=" border p-6 max-w-[400px]">
        <div className="flex flex-col gap-3 p-4">
          <div>
            <SlidersVertical size={40} />
          </div>
          <h2 className="font-bold text-xl">Your global preferences</h2>
          <p className="text-secondary font-medium">
            Changing your currency updates how you see prices. You can change
            how you get payments in your payments & payouts preferences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default preferencesCard;
