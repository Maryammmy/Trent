import Counter from "../home/Counter";
import Button from "../ui/Button";
import DatePicker from "../ui/DatePicker";

function CheckDates() {
  return (
    <div className="flex-1">
      <div className="border shadow-lg rounded-lg p-6 max-w-[400px] ">
        <h2 className="text-black text-2xl font-medium pb-3">
          Add dates for prices
        </h2>
        <div className="border border-stone-300 rounded-lg flex flex-col">
          <div className="flex gap-10 xl:gap-20 border-b border-stone-300 text-sm">
            <Button className="ps-3 py-1 flex flex-col items-start">
              <h3 className="text-black font-bold">CHECK-IN</h3>
              <DatePicker />
            </Button>
            <Button className="border-l ps-3  py-1 flex flex-col items-start">
              <h3 className="text-black font-bold">CHECKOUT</h3>
              <DatePicker />
            </Button>
          </div>
          <div className="ps-3 py-1 text-sm">
            <h2 className="text-black font-bold">GUESTS</h2>
            <div className="font-medium">
              <Counter />
            </div>
          </div>
        </div>
        <Button className="bg-primary text-lg text-white font-semibold w-full py-2 rounded-md mt-4">
          Check availability
        </Button>
      </div>
    </div>
  );
}

export default CheckDates;
