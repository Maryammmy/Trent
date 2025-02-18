import Image from "../../ui/Image";
import property from "../../../assets/iamges/property.jpg";
const ListingItem = () => {
  return (
    <tr className="mb-5">
      <td className="flex items-center">
        <div className="w-16 h-16">
          <Image
            imageUrl={property}
            alt="property"
            className="w-full h-full rounded-md"
          />
        </div>
      </td>
      <td className="text-dark">Shubra</td>
      <td className=" font-semibold">Action required</td>
    </tr>
  );
};

export default ListingItem;
