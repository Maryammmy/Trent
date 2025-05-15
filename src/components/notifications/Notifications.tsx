import { useRef, useState } from "react";
import { Bell, X } from "lucide-react";
import Button from "../ui/Button";
import {
  updateNotificationAPI,
  useNotificationsAPI,
  useUnreadNotificationsCountAPI,
} from "@/services/Notifications";
import { INotification } from "@/interfaces/notifications";
import Notification from "./Notification";
import useClickOutside from "@/hooks/useClickOutside";
import NotificationSkeleton from "../skeleton/NotificationSkeleton";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { ApiError } from "@/interfaces";

export default function Notifications() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { data, refetch: refetchNotifications } = useNotificationsAPI();
  const notifications: INotification[] = data?.data?.data?.notification_list;
  const { data: unreadCountData, refetch: refetchUnreadCount } =
    useUnreadNotificationsCountAPI();
  const unreadCount = unreadCountData?.data?.data?.count;
  useClickOutside(notificationsRef, () => setOpen(false));
  const updateNotifications = async () => {
    try {
      const response = await updateNotificationAPI("*");
      if (response?.data?.response_code === 200) {
        refetchNotifications();
        refetchUnreadCount();
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
    <div className="relative" ref={notificationsRef}>
      <Button
        onClick={() => setOpen(!open)}
        className="text-white hover:text-secondary flex justify-center items-center relative"
      >
        <Bell />

        {/* Badge */}
        {unreadCount > 0 && !open && (
          <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
      {open && (
        <>
          {/* Small screens: Full screen */}
          <div className="fixed overflow-y-auto inset-0 bg-white z-50 sm:hidden">
            {!notifications ? (
              <NotificationSkeleton cards={8} />
            ) : notifications?.length ? (
              <>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Notifications</h2>
                    <Button onClick={() => setOpen(false)}>
                      <X />
                    </Button>
                  </div>
                  {unreadCount > 0 && (
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-neutral-400">
                        {unreadCount} unread
                      </span>
                      <Button
                        onClick={updateNotifications}
                        className="text-secondary"
                      >
                        Make all as read
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  {notifications?.map((notification) => (
                    <Notification
                      key={notification?.id}
                      notification={notification}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-6 px-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <Button onClick={() => setOpen(false)}>
                    <X />
                  </Button>
                </div>
                <p className="text-dark font-medium text-lg flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
                  {t("no_notifications_found")}
                </p>
              </div>
            )}
          </div>
          {/* Medium+ screens: Small dropdown */}
          <div className="overflow-x-hidden hidden sm:block absolute right-0 top-10 min-w-96 bg-white shadow-lg rounded-lg z-50">
            <div className="max-h-[600px] overflow-y-auto">
              {!notifications ? (
                <NotificationSkeleton cards={4} />
              ) : notifications?.length ? (
                <>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Notifications</h2>
                      <Button onClick={() => setOpen(false)}>
                        <X />
                      </Button>
                    </div>
                    {unreadCount > 0 && (
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-neutral-400">
                          {unreadCount} unread
                        </span>
                        <Button
                          onClick={updateNotifications}
                          className="text-secondary"
                        >
                          Make all as read
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {notifications?.map((notification) => (
                      <Notification
                        key={notification?.id}
                        notification={notification}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-6 px-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Notifications</h2>
                    <Button onClick={() => setOpen(false)}>
                      <X />
                    </Button>
                  </div>
                  <p className="text-dark font-medium text-lg flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
                    {t("no_notifications_found")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
