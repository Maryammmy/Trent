function BookingSkeleton({ cards }: { cards: number }) {
  return (
    <div className="max-w-6xl mx-auto py-5 md:py-10 px-5 xl:px-0">
      <div className="space-y-5">
        <h2 className="bg-stone-200 rounded-md overflow-hidden h-8 w-3/4 sm:w-1/3 animate-pulse"></h2>
        <p className="bg-stone-200 rounded-md overflow-hidden h-8 w-1/2 sm:w-1/4 animate-pulse"></p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 py-5 md:py-10">
        {Array.from({ length: cards }).map((_, index) => (
          <div
            key={index}
            className="bg-stone-200 rounded-md overflow-hidden h-8 animate-pulse"
          ></div>
        ))}
      </div>
      <div className="space-y-5">
        <div className="bg-stone-200 rounded-md overflow-hidden h-8 w-full animate-pulse"></div>
        <div className="bg-stone-200 rounded-md overflow-hidden h-8 w-full animate-pulse"></div>
      </div>
    </div>
  );
}

export default BookingSkeleton;
