import { setIsSearchOpen } from "../../store/features/homeSearch/homeSearchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "../ui/Modal";
import Search from "./SearchComponent";

function SearchModal() {
  const { isSearchOpen } = useAppSelector((state) => state.homeSearch);
  const dispatch = useAppDispatch();
  return (
    <Modal isOpen={isSearchOpen} close={() => dispatch(setIsSearchOpen(false))}>
      <Search />
    </Modal>
  );
}

export default SearchModal;
