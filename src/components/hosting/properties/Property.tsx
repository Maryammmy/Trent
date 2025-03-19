import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import { IProperty } from "../../../interfaces/property/propertyInterface";
import { baseURL } from "../../../services";
import { truncateText } from "../../../utils/truncateText";
interface IProps {
  property: IProperty;
}
const Property = ({ property }: IProps) => {
  const { id, title, compound_name, image_list } = property;
  return (
    <Link
      to={`/hosting/properties/${id}/update`}
      className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-white shadow rounded-md p-4 hover:bg-gray-100 transition cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-16 h-16">
          <Image
            imageUrl={baseURL + image_list[0].img}
            alt="property"
            className="w-full h-full rounded-md"
          />
        </div>
        <span className="font-medium">{truncateText(title, 10)}</span>
      </div>
      <p className="text-dark">{truncateText(compound_name, 10)}</p>
      <p className="font-semibold">Action required</p>
    </Link>
  );
};

export default Property;
