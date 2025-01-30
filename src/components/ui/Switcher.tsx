import { Switch } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setEnableTaxes } from "../../store/features/taxes/taxesSlice";

export default function Switcher() {
  const dispatch = useAppDispatch();
  const { enableTaxes } = useAppSelector((state) => state.taxes);
  return (
    <Switch
      checked={enableTaxes}
      onChange={() => dispatch(setEnableTaxes())}
      className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-300 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-black"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </Switch>
  );
}
