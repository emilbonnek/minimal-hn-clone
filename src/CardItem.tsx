import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "./hackernews/api";
import { Item } from "./hackernews/types";
import { formatRelativeTimeFormat } from "./utils/dates";

interface CardItemProps {
  item: Item;
}

/**
 * A card component to display a item
 *
 * @param item The item to display
 * @returns A card component
 */
function CardItem({ item }: CardItemProps) {
  const {
    data: author,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["author", item.by],
    queryFn: () => getAuthor(item.by),
  });

  return (
    <div className="h-auto p-4 border border-gray-200 my-4 rounded-lg shadow space-y-2 bg-white">
      {item.type === "story" ? (
        <a href={item.url} className="hover:underline">
          <h2 className="text-xl font-bold text-blue-600">{item.title}</h2>
        </a>
      ) : (
        <h2 className="text-xl font-bold text-blue-600">{item.title}</h2>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <p className="text-gray-600 mr-2">By:</p>
          <p className="text-gray-900 font-semibold flex items-baseline">
            {item.by}
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
          Score: <span className="font-semibold">{item.score}</span>
        </p>
      </div>
      <p className="text-sm text-gray-500">
        {formatRelativeTimeFormat(item.time)}
      </p>
    </div>
  );
}

export default CardItem;
