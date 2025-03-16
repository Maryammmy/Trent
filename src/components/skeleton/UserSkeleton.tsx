import UpdateSkeleton from "./UpdateSkeleton";

function UserSkeleton({ cards }: { cards: number }) {
  return (
    <div>
      <div className="w-28 h-28 rounded-full bg-stone-200 animate-pulse mb-4"></div>
      <UpdateSkeleton cards={cards} />
    </div>
  );
}

export default UserSkeleton;
