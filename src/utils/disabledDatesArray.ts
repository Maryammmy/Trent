export function getDisabledDatesArray(nextAvailableDate: string) {
  if (
    !nextAvailableDate ||
    new Date(nextAvailableDate).getTime() <= new Date().getTime()
  ) {
    return [];
  }

  return [
    {
      startDate: new Date(),
      endDate: new Date(
        new Date(nextAvailableDate).setDate(
          new Date(nextAvailableDate).getDate() - 1
        )
      ),
    },
  ];
}
