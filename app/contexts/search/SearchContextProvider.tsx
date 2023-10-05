import { FC, useState } from "react";
import { SearchContext } from "./SearchContext";
import { SearchContextProviderProps, SearchResultItem } from "../../types/SearchContext.types";

export const SearchContextProvider: FC<SearchContextProviderProps> = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [items, setItems] = useState<SearchResultItem[]>([]);

  return <SearchContext.Provider value={{ searchText, setSearchText, searchedTerm, setSearchedTerm, items, setItems }}>{children}</SearchContext.Provider>;
};
