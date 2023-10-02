import { Dispatch, ReactNode, SetStateAction } from "react";

export type SearchContextProviderValue = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchedTerm: string;
  setSearchedTerm: Dispatch<SetStateAction<string>>;
};

export type SearchContextProviderProps = {
  children: ReactNode;
};
