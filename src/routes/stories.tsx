import { createFileRoute, useNavigate } from "@tanstack/react-router";
import HnListItems from "../HnListItems";
import { fallback, object, parse } from "valibot";
import {
  ListTypeSchema,
  SORT_BY_OPTIONS,
  SortBySchema,
} from "../stories-navigation";
import Navigation from "../Navigation";

const StoriesSearchSchema = object({
  list: fallback(ListTypeSchema, "new"),
  sortBy: fallback(SortBySchema, "score"),
});

export const Route = createFileRoute("/stories")({
  component: Stories,
  validateSearch: (search: Record<string, unknown>) =>
    parse(StoriesSearchSchema, search),
});

/**
 * A page that displays a list of stories from Hacker News
 *
 * It takes search parameters from the URL to determine the list type, amount, and sorting method
 *
 * @returns A page that displays a list of stories from Hacker News
 */
function Stories() {
  const { list, sortBy } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <>
      <div className="flex justify-between">
        <Navigation sortBy={sortBy} />

        <div className="flex items-center">
          <form>
            <div>
              <label htmlFor="sortBy">Sort by:</label>
              <select
                name="sortBy"
                value={sortBy}
                onChange={(e) => {
                  const newSortBy = parse(SortBySchema, e.target.value);
                  navigate({
                    search: {
                      list,
                      sortBy: newSortBy,
                    },
                  });
                }}
              >
                {SORT_BY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div></div>
          </form>
        </div>
      </div>

      <hr />
      <div className="p-2">
        <HnListItems list={list} sortBy={sortBy} />
      </div>
    </>
  );
}
