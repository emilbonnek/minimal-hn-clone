import { useQuery } from "@tanstack/react-query";
import { getItem } from "./hackernews/api";
import CardStory from "./CardStory";
import CardJob from "./CardJob";
import CardPoll from "./CardPoll";

interface HnItemProps {
  id: number;
}

function HnItem({ id }: HnItemProps) {
  const {
    data: item,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["items", id],
    queryFn: () => getItem(id),
  });

  if (isLoading) {
    return <div></div>;
  }
  if (!isSuccess) {
    // Show the error message if query failed, so we can see what failed
    return <div>{isError ? error?.message : "Unknown error"}</div>;
  }

  return (
    <div>
      {item && (
        <div>
          {item.type === "story" && <CardStory story={item} />}
          {item.type === "job" && <CardJob job={item} />}
          {item.type === "poll" && <CardPoll poll={item} />}
        </div>
      )}
    </div>
  );
}

export default HnItem;
