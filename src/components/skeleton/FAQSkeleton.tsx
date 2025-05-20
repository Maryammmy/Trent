function FAQSkeleton({ cards }: { cards: number }) {
  return (
    <>
      <div className="bg-stone-200 rounded-md overflow-hidden h-12 animate-pulse w-1/2 lg:w-1/3"></div>
      <div className="flex flex-col gap-5 flex-1">
        {" "}
        {Array.from({ length: cards }).map((_, index) => (
          <div
            key={index}
            className="bg-stone-200 rounded-md overflow-hidden h-12 animate-pulse"
          ></div>
        ))}
      </div>
    </>
  );
}

export default FAQSkeleton;
