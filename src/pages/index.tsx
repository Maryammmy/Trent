import Cart from "../components/Cart";
import NavbarOfUtils from "../components/CategoryBar";
import DatePicker from "../components/ui/DatePicker";

export default function Home() {
  const cartItems = Array.from({ length: 20 });

  return (
    <div className="">
      <NavbarOfUtils />
      <div className="py-5 md:py-10 px-5 xl:px-20 mt-32 lg:mt-44 flex flex-col md:flex-row flex-wrap  gap-5 justify-center md:justify-start  items-center">
        {cartItems.map((_, index) => (
          <Cart key={index} />
        ))}
      </div>
      <DatePicker />
    </div>
  );
}
