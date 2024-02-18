import { createFileRoute, useNavigate } from "@tanstack/react-router";
import HnListItem from "../HnListItems";
import { fallback, object, parse } from "valibot";
import { ListTypeSchema, SortBySchema } from "../hackernews/types";
import Navigation from "../Navigation";

const StoriesSearchSchema = object({
  list: fallback(ListTypeSchema, "new"),
  sortBy: fallback(SortBySchema, "score"),
});
const validateSearch = (search: Record<string, unknown>) =>
  parse(StoriesSearchSchema, search);

export const Route = createFileRoute("/stories")({
  component: Stories,
  validateSearch,
});

function Stories() {
  const { list, sortBy } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <>
      <div className="flex justify-between">
        <Navigation sortBy={sortBy} />

        <div>
          <form>
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
              <option value="score">Score</option>
              <option value="date">Date</option>
            </select>
          </form>
        </div>
      </div>

      <hr />
      <div className="p-2">
        <HnListItem listType={list} />
      </div>
    </>
  );
}
