export const formatDateTime = (dateTimeString: string) => {
  if (!dateTimeString) return { date: "", time: "" };

  const [date, time] = dateTimeString.split(" ");
  return { date, time };
};
export const formatTime12Hour = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), Number(seconds));

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
