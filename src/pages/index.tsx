import Cart from "../components/Cart";
import CategoryBar from "../components/CategoryBar";

export default function Home() {
  const cartItems = Array.from({ length: 20 });

  return (
    <div className="">
      <CategoryBar />
      <div className="py-5 md:py-10 px-5 xl:px-20 mt-32 lg:mt-44 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cartItems.map((_, index) => (
          <Cart key={index} />
        ))}
      </div>
    </div>
  );
}
