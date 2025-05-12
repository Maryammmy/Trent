import { INotification } from "@/interfaces/notifications";
import Image from "../ui/Image";
import { baseURL } from "@/services";

interface IProps {
  notification: INotification;
}
function Notification({ notification }: IProps) {
  const { title, body, image_list } = notification;
  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            imageUrl={baseURL + image_list?.[0]?.img}
            alt="notification image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default Notification;
