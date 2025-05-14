function NotificationSkeleton({ cards }: { cards: number }) {
  return (
    <div className="py-6 px-4">
      <h2 className="bg-stone-200 rounded-md overflow-hidden h-8 animate-pulse w-1/2 mb-5"></h2>
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: cards }).map((_, index) => (
          <div
            key={index}
            className="bg-stone-200 rounded-md overflow-hidden h-8 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default NotificationSkeleton;
