export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return `${year}-${month}-${day}`;
};
