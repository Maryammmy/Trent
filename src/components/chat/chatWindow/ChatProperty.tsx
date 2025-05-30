import Image from "@/components/ui/Image";
import { baseURL } from "@/services";
import { Link } from "react-router-dom";

function ChatProperty() {
  const chattedOwner = JSON.parse(
    sessionStorage.getItem("chattedOwner") || "null"
  );
  return (
    <Link
      to={`/properties/${chattedOwner?.prop_id}`}
      className="flex gap-3 items-center p-2"
    >
      <div className="h-10 w-10 rounded-md overflow-hidden">
        <Image
          imageUrl={baseURL + chattedOwner?.prop_image}
          className=""
          alt=""
        />
      </div>
      <h3 className="font-semibold">{chattedOwner?.title}</h3>
    </Link>
  );
}

export default ChatProperty;
