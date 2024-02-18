import {
  Output,
  coerce,
  integer,
  maxValue,
  minValue,
  number,
  picklist,
} from "valibot";

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

export const RawAmountSchema = number([integer(), minValue(3), maxValue(15)]);
export const AmountSchema = coerce(RawAmountSchema, Number);
export type Amount = Output<typeof AmountSchema>;

export const SORT_BY_OPTIONS = ["score", "time"] as const;
export const SortBySchema = picklist(SORT_BY_OPTIONS);
export type SortBy = Output<typeof SortBySchema>;
