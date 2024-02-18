import {
  Output,
  array,
  literal,
  number,
  object,
  optional,
  string,
  transform,
  variant,
} from "valibot";

export const StorySchema = object({
  by: string(),
  descendants: number(),
  id: number(),
  kids: optional(array(number())),
  score: number(),
  time: transform(number(), (v) => new Date(v * 1000)),
  title: string(),
  type: literal("story"),
  url: optional(string()),
});
export type Story = Output<typeof StorySchema>;

export const JobSchema = object({
  by: string(),
  id: number(),
  score: number(),
  text: optional(string()),
  time: transform(number(), (v) => new Date(v * 1000)),
  title: string(),
  type: literal("job"),
  url: optional(string()),
});
export type Job = Output<typeof JobSchema>;

export const PollSchema = object({
  by: string(),
  descendants: number(),
  id: number(),
  kids: optional(array(number())),
  parts: array(number()),
  score: number(),
  text: string(),
  time: transform(number(), (v) => new Date(v * 1000)),
  title: string(),
  type: literal("poll"),
});
export type Poll = Output<typeof PollSchema>;

export const ItemSchema = variant("type", [StorySchema, JobSchema, PollSchema]);
export type Item = Output<typeof ItemSchema>;

export const AuthorSchema = object({
  about: optional(string()),
  created: transform(number(), (v) => new Date(v * 1000)),
  id: string(),
  karma: number(),
  submitted: array(number()),
});
export type Author = Output<typeof AuthorSchema>;
