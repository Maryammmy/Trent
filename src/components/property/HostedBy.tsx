import Image from "../ui/Image";
import user from "../../assets/iamges/home1.avif";
import { Fence, KeyRound, MapPin } from "lucide-react";

function HostedBy() {
  return (
    <div className="border-t border-b py-4">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            imageUrl={user}
            alt="User Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-black font-bold">Hosted by Alys</h2>
          <p className="text-secondary">Superhost.6 years hosting</p>
        </div>
      </div>
      <div className="py-5">
        <ul className="flex flex-col gap-5">
          <li className="flex gap-5">
            <span className="pt-2">
              <KeyRound className="text-black" />
            </span>
            <div>
              <h3 className="text-black">Great check-in experience</h3>
              <p className="text-secondary">
                Recent guests loved the smooth start to this stay.
              </p>
            </div>
          </li>
          <li className="flex gap-5">
            <span className="pt-2">
              <MapPin className="text-black" />
            </span>
            <div>
              <h3 className="text-black">Beautiful area</h3>
              <p className="text-secondary">
                Guests love this home’s scenic location.
              </p>
            </div>
          </li>
          <li className="flex gap-5">
            <span className="pt-2">
              <Fence className="text-black" />
            </span>
            <div>
              <h3 className="text-black font-semibold">Garden view</h3>
              <p className="text-secondary">
                Soak up the view during your stay.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HostedBy;
