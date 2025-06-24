export function groupConsecutiveDates(dates: string[]): [string, string][] {
  if (!dates?.length) return [];

  const sortedDates = [...dates].sort();

  const result: [string, string][] = [];
  let rangeStart = sortedDates[0];
  let prevDate = new Date(sortedDates[0]);

  for (let i = 1; i < sortedDates?.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const nextDate = new Date(prevDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const isConsecutive =
      currentDate.toISOString().split("T")[0] ===
      nextDate.toISOString().split("T")[0];

    if (!isConsecutive) {
      result.push([rangeStart, sortedDates[i - 1]]);
      rangeStart = sortedDates[i];
    }

    prevDate = currentDate;
  }

  result.push([rangeStart, sortedDates[sortedDates?.length - 1]]);

  return result;
}
