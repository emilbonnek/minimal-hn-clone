import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "./hackernews/api";
import { Poll } from "./hackernews/types";

interface CardPollProps {
  poll: Poll;
}

/**
 * A card component to display a poll
 *
 * @param poll The poll to display
 * @returns A card component
 */
function CardPoll({ poll }: CardPollProps) {
  const {
    data: author,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["author", poll.by],
    queryFn: () => getAuthor(poll.by),
  });

  return (
    <div className="h-auto p-4 border border-gray-200 my-4 rounded-lg shadow space-y-2 bg-white">
      <h2 className="text-xl font-bold text-blue-600">{poll.title}</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <p className="text-gray-600 mr-2">By:</p>
          <p className="text-gray-900 font-semibold flex items-baseline">
            {poll.by}
            {isLoading ? (
              <sub className="text-xs ml-1">...</sub>
            ) : isSuccess ? (
              <sub className="text-xs ml-1">{author.karma}</sub>
            ) : (
              <sub className="text-xs ml-1">N/A</sub>
            )}
          </p>
        </div>
        <p className="text-gray-600">
          Score: <span className="font-semibold">{poll.score}</span>
        </p>
      </div>
      <p className="text-sm text-gray-500">{poll.time.toLocaleString()}</p>
    </div>
  );
}

export default CardPoll;
