import { useRef, useState } from "react";
import { Bell, X } from "lucide-react";
import Button from "../ui/Button";
import { useNotificationsAPI } from "@/services/Notifications";
import { INotification } from "@/interfaces/notifications";
import Notification from "./Notification";
import useClickOutside from "@/hooks/useClickOutside";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const unreadCount = 3;
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { data } = useNotificationsAPI();
  const notifications: INotification[] = data?.data?.data?.notification_list;
  useClickOutside(notificationsRef, () => setOpen(false));
  return (
    <div className="relative" ref={notificationsRef}>
      <Button
        onClick={() => setOpen(!open)}
        className="text-white flex justify-center items-center relative"
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
          <div className="fixed overflow-y-auto inset-0 bg-white z-50 p-4 sm:hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <Button onClick={() => setOpen(false)}>
                <X />
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {notifications.slice(2).map((notification) => (
                <Notification
                  key={notification?.id}
                  notification={notification}
                />
              ))}
            </div>
          </div>
          {/* Medium+ screens: Small dropdown */}
          <div className="py-1 px-[1px] hidden sm:block absolute right-0 top-10 min-w-96 bg-white shadow-lg rounded-lg z-50">
            <div className="max-h-[600px] overflow-y-auto">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Notifications</h2>
                {/* <p>You have {unreadCount} new notifications.</p> */}
                <div className="flex flex-col gap-4">
                  {notifications.slice(2).map((notification) => (
                    <Notification
                      key={notification?.id}
                      notification={notification}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
