export default function ChooseUsSkeleton({ cards }: { cards: number }) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="h-40 w-40 overflow-hidden bg-stone-200 animate-pulse rounded-full"
          ></div>
        ))}
    </>
  );
}
