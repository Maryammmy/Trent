import { School } from "lucide-react";
import { destinations } from "../data";

function DestinationCard() {
  return (
    <div
      className={`hidden xl:block absolute top-0 max-w-md mt-2 shadow-lg ps-4 pe-1 py-4 bg-white rounded-3xl ${
        document.documentElement.dir === "rtl" ? "right-0" : "left-0"
      }`}
    >
      <div className="p-2 overflow-y-auto  max-h-[500px] destination-scroller">
        {destinations.map((item, index) => (
          <div
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer rounded-md flex gap-4 items-center"
          >
            <div className="  bg-blue-50 p-2 rounded-lg">
              <School className="text-secondary" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{item.city}</h3>
              <p className="text-sm text-secondary">{item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationCard;
