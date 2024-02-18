import { useQueries, useQuery } from "@tanstack/react-query";
import { getItem, getIds } from "./hackernews/api";
import CardStory from "./CardStory";
import CardJob from "./CardJob";
import CardPoll from "./CardPoll";
import { Amount, ListType, SortBy } from "./stories-navigation";

interface HnListStoriesProps {
  listType: ListType;
  amount: Amount;
  sortBy: SortBy;
}

function HnListItems({ listType, amount, sortBy }: HnListStoriesProps) {
  const { data: ids } = useQuery({
    queryKey: ["ids", listType],
    queryFn: () => getIds(listType),
  });

  const page = 1; // For now, we're just going to show the first page of results
  const paginatedIds = ids?.slice(page * amount, (page + 1) * amount);
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
    // Show the error message if any of the queries failed, so we can see what failed
    return (
      <div>
        {itemQueryResults.map((query, i) => {
          // Print the query key so we can see which query failed
          return (
            <div key={i}>
              <pre>{JSON.stringify(query, null, 2)}</pre>
              {query.error?.message}
            </div>
          );
        })}
      </div>
    );
  }

  // If we're here, we know that all the queries succeeded. Now we sort the results by the sortby parameter
  const sortedItemQueryResults = itemQueryResults.sort((a, b) => {
    if (a.isSuccess && b.isSuccess) {
      if (sortBy === "score") {
        return b.data.score - a.data.score;
      }
      if (sortBy === "time") {
        return b.data.time.getTime() - a.data.time.getTime();
      }
    }
    return 0;
  });

  return (
    <div>
      {sortedItemQueryResults.map(
        (storyQueryResult) =>
          storyQueryResult.isSuccess &&
          storyQueryResult.data && (
            <div key={storyQueryResult.data.id}>
              {storyQueryResult.data.type === "story" && (
                <CardStory story={storyQueryResult.data} />
              )}
              {storyQueryResult.data.type === "job" && (
                <CardJob job={storyQueryResult.data} />
              )}
              {storyQueryResult.data.type === "poll" && (
                <CardPoll poll={storyQueryResult.data} />
              )}
            </div>
          )
      )}
    </div>
  );
}

export default HnListItems;
