export default function PropertyCardSkeleton({ cards }: { cards: number }) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div key={index} className=" flex flex-col gap-2">
            <div className="rounded-md  bg-stone-200 animate-pulse overflow-hidden h-[300px]"></div>
            <div className=" flex justify-between">
              <div>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-28 rounded-md mb-2 bg-stone-200 animate-pulse"
                  />
                ))}
              </div>
              <div className="h-4 w-12 rounded-md bg-stone-200   animate-pulse"></div>
            </div>
          </div>
        ))}
    </>
  );
}
