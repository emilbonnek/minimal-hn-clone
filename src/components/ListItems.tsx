import { useQueries, useQuery } from "@tanstack/react-query";
import { getItem, getIds } from "../hackernews/api";
import { ListType, Order, SortBy } from "../utils/stories-navigation";
import CardItem from "./CardItem";

interface ListStoriesProps {
  list: ListType;
  sortBy: SortBy;
  order: Order;
}

// If we were to implement pagination we could make these dynamic.
const PAGE = 1;
const PAGE_SIZE = 10;

function ListItems({ list, sortBy, order }: ListStoriesProps) {
  // Fetch the list of IDs for the given list type
  const { data: ids } = useQuery({
    queryKey: ["ids", list],
    queryFn: () => getIds(list),
  });

  // This calculates the range of IDs to fetch - its a little too complicated because there is no actual pagination implemented
  const paginatedIds = ids?.slice(PAGE * PAGE_SIZE, (PAGE + 1) * PAGE_SIZE);

  // Fetch the items for the given list type
  const itemQueryResults = useQueries({
    queries: paginatedIds
      ? paginatedIds.map((id) => {
          return {
            queryKey: ["items", id],
            queryFn: () => getItem(id),
          };
        })
      : [],
  });

  // Handle loading and error states
  const isLoading = itemQueryResults.some((query) => query.isLoading);
  const isSuccess = itemQueryResults.every((query) => query.isSuccess);
  if (isLoading) {
    return <></>;
  }
  if (!isSuccess) {
    return <>Error</>;
  }

  // If we're here, we know that all the queries succeeded.
  const sortedItemQueryResults = itemQueryResults.sort((a, b) => {
    // This should never happen, but checking just to make typescript happy
    if (!a.isSuccess || !b.isSuccess) {
      return 0;
    }

    // To handle sort ordering, we'll conditionally swap references to a and b
    const [left, right] = order === "asc" ? [a, b] : [b, a];

    // Sort by the selected sort term, at the moment, we only have two options so this is the simplest way to do it
    if (sortBy === "score") {
      return left.data.score - right.data.score;
    } else {
      return right.data.time.getTime() - left.data.time.getTime();
    }
  });

  return (
    <>
      {sortedItemQueryResults.map(
        (storyQueryResult) =>
          storyQueryResult.isSuccess &&
          storyQueryResult.data && (
            <div key={storyQueryResult.data.id}>
              <CardItem item={storyQueryResult.data} />
            </div>
          )
      )}
    </>
  );
}

export default ListItems;
