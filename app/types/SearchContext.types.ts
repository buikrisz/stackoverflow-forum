import { Dispatch, ReactNode, SetStateAction } from "react";

type Owner = {
  account_id: number;
  display_name: string;
  link: string;
  profile_image: string;
  reputation: number;
  user_id: number;
  user_type: string;
};

export type SearchResultItem = {
  answer_count: number;
  content_license: string;
  creation_date: Date;
  is_answered: boolean;
  last_activity_date: Date;
  last_edit_date: Date;
  link: string;
  owner: Owner;
  question_id: number;
  tags: string[];
  title: string;
  body: string;
  view_count: number;
};

export type SearchContextProviderValue = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchedTerm: string;
  setSearchedTerm: Dispatch<SetStateAction<string>>;
  items: SearchResultItem[];
  setItems: Dispatch<SetStateAction<SearchResultItem[]>>;
};

export type SearchContextProviderProps = {
  children: ReactNode;
};

export type SearchCardProps = {
  title: string;
  text: string;
  view_count: number;
  answer_count: number;
  votes?: number;
  tags?: string[];
  owner?: Owner;
  date?: string;
  link?: string;
  is_answered?: boolean;
};
