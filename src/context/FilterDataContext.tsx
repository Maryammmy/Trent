import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IProperty } from "../interfaces/property";
import { IFilterSlider } from "@/interfaces/filterSlider";

interface IFilterDataContext {
  filterData: null | IProperty[];
  setFilterData: Dispatch<SetStateAction<null | IProperty[]>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  filterSlider: {
    governmentId: string;
    categoryId: string;
    usersList?: string[];
  };
  setFilterSlider: Dispatch<
    SetStateAction<{
      governmentId: string;
      categoryId: string;
      usersList?: string[];
    }>
  >;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FilterDataContext = createContext({} as IFilterDataContext);
const FilterDataContextProvider = ({ children }: { children: ReactNode }) => {
  const [filterData, setFilterData] = useState<null | IProperty[]>(null);
  const [category, setCategory] = useState("");
  const [filterSlider, setFilterSlider] = useState<IFilterSlider>({
    governmentId: "",
    categoryId: "",
    usersList: [],
  });
  return (
    <FilterDataContext.Provider
      value={{
        filterData,
        setFilterData,
        category,
        setCategory,
        filterSlider,
        setFilterSlider,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
};

export default FilterDataContextProvider;
