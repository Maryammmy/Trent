import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import property from "../../../assets/iamges/property.jpg";

const PropertyItem = ({ id }: { id: number }) => {
  return (
    <Link
      to={`/hosting/properties/${id}`}
      className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-white shadow rounded-md p-4 hover:bg-gray-100 transition cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-16 h-16">
          <Image
            imageUrl={property}
            alt="property"
            className="w-full h-full rounded-md"
          />
        </div>
        <span className="font-medium">Cozy Home</span>
      </div>
      <p className="text-dark">Shubra</p>
      <p className="font-semibold">Action required</p>
    </Link>
  );
};

export default PropertyItem;
