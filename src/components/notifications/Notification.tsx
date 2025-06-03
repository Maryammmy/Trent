import {
  INotification,
  INotificationRouteMap,
} from "@/interfaces/notifications";
import Image from "../ui/Image";
import { baseURL } from "@/services";
import toast from "react-hot-toast";
import { ApiError } from "@/interfaces";
import { useTranslation } from "react-i18next";
import { updateNotificationAPI } from "@/services/Notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface IProps {
  notification: INotification;
  close: () => void;
}
function Notification({ notification, close }: IProps) {
  const { title, body, image_list, is_seen, id, key, value } = notification;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const routeMap: INotificationRouteMap = {
    booking_id: `/account-settings/bookings/${value}?status=active`,
    property_id: `/hosting/properties`,
  };

  const updateNotification = async () => {
    try {
      const response = await updateNotificationAPI(id);
      if (response?.data?.response_code === 200) {
        queryClient.refetchQueries({ queryKey: ["notifications"] });
        queryClient.refetchQueries({ queryKey: ["unreadNotificationsCount"] });
        setTimeout(() => {
          if (routeMap[key]) {
            navigate(routeMap[key]);
          }
          close();
        }, 500);
      }
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
    }
  };
  return (
    <div
      onClick={updateNotification}
      className={`flex items-center gap-4 p-3 cursor-pointer ${
        !is_seen && "bg-gray-100"
      }`}
    >
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
