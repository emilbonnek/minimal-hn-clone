import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "./hackernews/api";
import { Story } from "./hackernews/types";

interface CardStoryProps {
  story: Story;
}

/**
 * A card component to display a story
 *
 * @param story The story to display
 * @returns A card component
 */
function CardStory({ story }: CardStoryProps) {
  const {
    data: author,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["author", story.by],
    queryFn: () => getAuthor(story.by),
  });

  return (
    <div className="h-auto p-4 border border-gray-200 my-4 rounded-lg shadow space-y-2 bg-white">
      <a href={story.url} className="hover:underline">
        <h2 className="text-xl font-bold text-blue-600">{story.title}</h2>
      </a>
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <p className="text-gray-600 mr-2">By:</p>
          <p className="text-gray-900 font-semibold flex items-baseline">
            {story.by}
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
          Score: <span className="font-semibold">{story.score}</span>
        </p>
      </div>
      <p className="text-sm text-gray-500">{story.time.toLocaleString()}</p>
    </div>
  );
}

export default CardStory;
