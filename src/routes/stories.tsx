import { createFileRoute, useNavigate } from "@tanstack/react-router";
import HnListItems from "../HnListItems";
import { fallback, object, parse } from "valibot";
import {
  ListTypeSchema,
  OrderSchema,
  SortBySchema,
} from "../stories-navigation";
import Navigation from "../Navigation";
import FormSorting from "../FormSorting";

const StoriesSearchSchema = object({
  list: fallback(ListTypeSchema, "new"),
  sortBy: fallback(SortBySchema, "score"),
  order: fallback(OrderSchema, "desc"),
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
  const { list, sortBy, order } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <>
      <div className="flex justify-between">
        <Navigation sortBy={sortBy} order={order} />

        <div className="flex items-center">
          <FormSorting
            sortBy={sortBy}
            order={order}
            onChangeSortBy={(newSortBy) => {
              navigate({
                search: {
                  list,
                  sortBy: newSortBy,
                  order,
                },
              });
            }}
            onChangeOrder={(newOrder) => {
              navigate({
                search: {
                  list,
                  sortBy,
                  order: newOrder,
                },
              });
            }}
          />
        </div>
      </div>

      <hr />
      <div className="p-2">
        <HnListItems list={list} sortBy={sortBy} order={order} />
      </div>
    </>
  );
}
