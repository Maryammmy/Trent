import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IProperty } from "../interfaces/property";
import { IFilterSlider } from "@/interfaces/filterSlider";
import { IHomeDataParams } from "@/interfaces/landing";

interface IFilterDataContext {
  filters: IHomeDataParams | null;
  setFilters: Dispatch<SetStateAction<IHomeDataParams | null>>;
  filterData: null | IProperty[];
  setFilterData: Dispatch<SetStateAction<null | IProperty[]>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  filterSlider: IFilterSlider | null;
  setFilterSlider: Dispatch<SetStateAction<IFilterSlider | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FilterDataContext = createContext({} as IFilterDataContext);
const FilterDataContextProvider = ({ children }: { children: ReactNode }) => {
  const [filterData, setFilterData] = useState<null | IProperty[]>(null);
  const [category, setCategory] = useState("");
  const [filterSlider, setFilterSlider] = useState<IFilterSlider | null>(null);
  const [filters, setFilters] = useState<IHomeDataParams | null>(null);
  return (
    <FilterDataContext.Provider
      value={{
        filterData,
        setFilterData,
        category,
        setCategory,
        filterSlider,
        setFilterSlider,
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
};

export default FilterDataContextProvider;
