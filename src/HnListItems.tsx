import { useQueries, useQuery } from "@tanstack/react-query";
import { getItem, getIds } from "./hackernews/api";
import { ListType, Order, SortBy } from "./stories-navigation";
import CardItem from "./CardItem";

interface HnListStoriesProps {
  list: ListType;
  sortBy: SortBy;
  order: Order;
}

const PAGE = 1;
const PAGE_SIZE = 10;

function HnListItems({ list, sortBy, order }: HnListStoriesProps) {
  const { data: ids } = useQuery({
    queryKey: ["ids", list],
    queryFn: () => getIds(list),
  });

  const paginatedIds = ids?.slice(PAGE * PAGE_SIZE, (PAGE + 1) * PAGE_SIZE);
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
    // This should never happen, but checking to make typescript happy
    if (!a.isSuccess || !b.isSuccess) {
      return 0;
    }

    const [left, right] = order === "asc" ? [a, b] : [b, a];

    if (sortBy === "score") {
      return left.data.score - right.data.score;
    } else {
      return left.data.time.getTime() - right.data.time.getTime();
    }
  });

  return (
    <div>
      {sortedItemQueryResults.map(
        (storyQueryResult) =>
          storyQueryResult.isSuccess &&
          storyQueryResult.data && (
            <div key={storyQueryResult.data.id}>
              <CardItem item={storyQueryResult.data} />
            </div>
          )
      )}
    </div>
  );
}

export default HnListItems;
