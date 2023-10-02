import { createContext } from "react";
import { SearchContextProviderValue } from "../types/SearchContext.types";

const defaultValue: SearchContextProviderValue = {
  searchText: "",
  setSearchText: () => null,
  searchedTerm: "",
  setSearchedTerm: () => null,
};

export const SearchContext = createContext<SearchContextProviderValue>(defaultValue);
