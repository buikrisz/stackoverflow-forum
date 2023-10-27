import { SearchContextProviderValue } from "@/app/types";
import { createContext } from "react";

const defaultValue: SearchContextProviderValue = {
  searchText: "",
  setSearchText: () => null,
  searchedTerm: "",
  setSearchedTerm: () => null,
  items: [],
  setItems: () => null,
};

export const SearchContext = createContext<SearchContextProviderValue>(defaultValue);
