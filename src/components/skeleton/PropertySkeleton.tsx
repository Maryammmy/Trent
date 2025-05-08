function PropertySkeleton() {
  return (
    <div>
      <h3 className="bg-stone-200 rounded-md h-8 w-1/4 animate-pulse mb-6"></h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-[250px] lg:h-[300px] bg-stone-200 animate-pulse rounded-md overflow-hidden"
          ></div>
        ))}
      </div>
      <div className="flex flex-col gap-5 pt-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-1/2 h-10 bg-stone-200 animate-pulse rounded-md overflow-hidden"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default PropertySkeleton;
