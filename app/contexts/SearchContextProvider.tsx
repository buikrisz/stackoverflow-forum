import { FC, useState } from "react";
import { SearchContext } from "./SearchContext";
import { SearchContextProviderProps } from "../types/SearchContext.types";

export const SearchContextProvider: FC<SearchContextProviderProps> = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");

  return <SearchContext.Provider value={{ searchText, setSearchText, searchedTerm, setSearchedTerm }}>{children}</SearchContext.Provider>;
};
