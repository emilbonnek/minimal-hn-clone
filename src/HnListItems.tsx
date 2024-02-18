import { useQueries, useQuery } from "@tanstack/react-query";
import { getItem, getIds } from "./hackernews/api";
import { ListType } from "./hackernews/types";
import CardStory from "./CardStory";
import CardJob from "./CardJob";
import CardPoll from "./CardPoll";

const PAGE_SIZE = 10;

interface HnListStoriesProps {
  listType: ListType;
}

function HnListItem({ listType }: HnListStoriesProps) {
  const { data: ids } = useQuery({
    queryKey: ["ids", listType],
    queryFn: () => getIds(listType),
  });

  const page = 1; // For now, we're just going to show the first page of results
  const paginatedIds = ids?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
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
    return <div></div>;
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

  return (
    <div>
      {itemQueryResults.map(
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

export default HnListItem;
