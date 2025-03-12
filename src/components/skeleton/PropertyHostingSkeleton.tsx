export default function PropertyHostingSkeleton({ cards }: { cards: number }) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-28 rounded-md bg-stone-200 animate-pulse"
          ></div>
        ))}
    </>
  );
}
