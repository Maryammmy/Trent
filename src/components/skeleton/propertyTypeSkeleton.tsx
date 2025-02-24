export default function PropertyTypeSkeleton({ cards }: { cards: number }) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="h-10 w-28 rounded-full bg-stone-200 animate-pulse"
          ></div>
        ))}
    </>
  );
}
