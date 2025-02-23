export default function CategoryBarSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-8 h-8 rounded-full bg-stone-200 animate-pulse"></div>
      <div className="w-14 h-3 mt-2 rounded-md bg-stone-200 animate-pulse"></div>
    </div>
  );
}
