interface IProps {
  cards: number;
  width?: string;
  height?: string;
}

export default function PropertyCartSkeleton({
  cards,
  width,
  height = "300px",
}: IProps) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2"
            style={{ width: width }}
          >
            <div
              className="rounded-md bg-stone-200 animate-pulse overflow-hidden"
              style={{ height: height }}
            ></div>
            <div className=" flex justify-between">
              <div>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-28 rounded-md mb-2 bg-stone-200 animate-pulse"
                  />
                ))}
              </div>
              <div className="h-4 w-12 rounded-md bg-stone-200 animate-pulse"></div>
            </div>
          </div>
        ))}
    </>
  );
}
