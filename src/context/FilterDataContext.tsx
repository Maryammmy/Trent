import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IProperty } from "../interfaces/propertyInterface";

interface FilterDataContextType {
  filterData: null | IProperty[];
  setFilterData: Dispatch<SetStateAction<null | IProperty[]>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
// eslint-disable-next-line react-refresh/only-export-components
export const FilterDataContext = createContext({} as FilterDataContextType);
const FilterDataContextProvider = ({ children }: { children: ReactNode }) => {
  const [filterData, setFilterData] = useState<null | IProperty[]>(null);
  const [category, setCategory] = useState("");
  return (
    <FilterDataContext.Provider
      value={{
        filterData,
        setFilterData,
        category,
        setCategory,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
};

export default FilterDataContextProvider;
