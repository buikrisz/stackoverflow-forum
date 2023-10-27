import { StaticImageData } from "next/image";

export enum BadgeType {
  Gold = 1,
  Silver,
  Bronze,
}

export type BadgeBoxProps = {
  type: BadgeType;
};

type User = {
  account_id: number;
  display_name: string;
  link: string;
  profile_image: string;
  reputation: number;
  user_id: number;
  user_type: string;
};

export type BadgeData = {
  award_count: number;
  badge_id: number;
  link: string;
  name: string;
  rank: string;
  user: User;
};

export type Medal = {
  type: BadgeType;
  image: StaticImageData;
};

export type TagsData = {
  tag_name: string;
  answer_count: number;
  answer_score: number;
  question_count: number;
  question_score: number;
};

export type AccountAgeProps = { years?: number; months?: number };

export type UserData = {
  display_name?: string;
  creation_date?: Date;
  profile_image?: string;
};
