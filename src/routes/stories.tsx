import { createFileRoute, useNavigate } from "@tanstack/react-router";
import HnListItems from "../HnListItems";
import { fallback, object, parse } from "valibot";
import {
  AmountSchema,
  ListTypeSchema,
  SORT_BY_OPTIONS,
  SortBySchema,
} from "../stories-navigation";
import Navigation from "../Navigation";

const StoriesSearchSchema = object({
  list: fallback(ListTypeSchema, "new"),
  amount: fallback(AmountSchema, 10),
  sortBy: fallback(SortBySchema, "score"),
});

export const Route = createFileRoute("/stories")({
  component: Stories,
  validateSearch: (search: Record<string, unknown>) =>
    parse(StoriesSearchSchema, search),
});

function Stories() {
  const { list, amount, sortBy } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <>
      <div className="flex justify-between">
        <Navigation sortBy={sortBy} amount={amount} />

        <div className="flex items-center">
          <form>
            <div>
              <label htmlFor="amount">Amount:</label>
              <select
                name="amount"
                value={amount}
                onChange={(e) => {
                  const newAmount = parse(AmountSchema, e.target.value);
                  navigate({ search: { list, amount: newAmount, sortBy } });
                }}
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
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
                      amount,
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
          </form>
        </div>
      </div>

      <hr />
      <div className="p-2">
        <HnListItems listType={list} amount={amount} sortBy={sortBy} />
      </div>
    </>
  );
}
