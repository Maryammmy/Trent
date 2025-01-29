import { useAppSelector } from "../../store/hooks";

export default function CategoryBarSkeleton({ cards }: { cards: number }) {
  const { shadow } = useAppSelector((state) => state.categoryBar);
  return (
    <div
      className={`fixed top-[81px] xl:top-[105px] z-20 w-full  bg-white  px-5 xl:px-20 py-5 transition-shadow ${
        shadow ? "shadow-lg" : ""
      } `}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {Array(cards)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-stone-200 animate-pulse"></div>
              <div className="w-14 h-3 mt-2 rounded-md bg-stone-200 animate-pulse"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

{
  /* <div
  className={`fixed top-[81px] xl:top-[105px] z-20 w-full  bg-white px-5 xl:px-20 py-5 transition-shadow ${
    shadow ? "shadow-lg" : ""
  }`}
></div>; */
}
