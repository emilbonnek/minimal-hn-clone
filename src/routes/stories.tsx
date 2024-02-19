import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ListItems from "../components/ListItems";
import { fallback, object, parse } from "valibot";
import {
  ListTypeSchema,
  OrderSchema,
  SortBySchema,
} from "../utils/stories-navigation";
import Navigation from "../components/Navigation";
import FormSorting from "../components/FormSorting";

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
 * It takes search parameters from the URL to determine the list type, sorting method and sorting order
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
        <ListItems list={list} sortBy={sortBy} order={order} />
      </div>
    </>
  );
}
