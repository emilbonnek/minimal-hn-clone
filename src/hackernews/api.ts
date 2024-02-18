import { array, number, parse } from "valibot";
import { Author, AuthorSchema, Item, ItemSchema } from "./types";
import { ListType } from "../stories-navigation";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

/**
 * Fetches 500 IDs from the Hacker News API.
 * @param list The type of list to fetch.
 * @returns An array of IDs.
 */
export async function getIds(list: ListType) {
  const r = await fetch(`${BASE_URL}/${list}stories.json`);
  const json = await r.json();
  const ids = parse(array(number()), json);
  return ids;
}

/**
 * Fetches an item from the Hacker News API.
 * @param id The ID of the item to fetch.
 * @returns The item.
 */
export async function getItem(id: number): Promise<Item> {
  const r = await fetch(`${BASE_URL}/item/${id}.json`);
  const json = await r.json();
  const item = parse(ItemSchema, json);
  return item;
}

/**
 * Fetches an author from the Hacker News API.
 * @param id The ID of the author to fetch.
 * @returns The author.
 */
export async function getAuthor(id: string): Promise<Author> {
  const r = await fetch(`${BASE_URL}/user/${id}.json`);
  const json = await r.json();
  const author = parse(AuthorSchema, json);
  return author;
}
