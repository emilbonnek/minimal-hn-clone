import { Output, picklist } from "valibot";

export const LIST_TYPE_OPTIONS = [
  "new",
  "top",
  "best",
  "ask",
  "show",
  "job",
] as const;
export const ListTypeSchema = picklist(LIST_TYPE_OPTIONS);
export type ListType = Output<typeof ListTypeSchema>;

export const SORT_BY_OPTIONS = ["score", "time"] as const;
export const SortBySchema = picklist(SORT_BY_OPTIONS);
export type SortBy = Output<typeof SortBySchema>;

export const ORDER_OPTIONS = ["asc", "desc"] as const;
export const OrderSchema = picklist(ORDER_OPTIONS);
export type Order = Output<typeof OrderSchema>;
