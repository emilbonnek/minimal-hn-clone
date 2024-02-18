import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "./hackernews/api";
import { Job } from "./hackernews/types";

interface CardJobProps {
  job: Job;
}

/**
 * A card component to display a job
 *
 * @param job The job to display
 * @returns A card component
 */
function CardJob({ job }: CardJobProps) {
  const {
    data: author,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["author", job.by],
    queryFn: () => getAuthor(job.by),
  });

  return (
    <div className="h-auto p-4 border border-gray-200 my-4 rounded-lg shadow space-y-2 bg-white">
      <a href={job.url} className="hover:underline">
        <h2 className="text-xl font-bold text-blue-600">{job.title}</h2>
      </a>
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <p className="text-gray-600 mr-2">By:</p>
          <p className="text-gray-900 font-semibold flex items-baseline">
            {job.by}
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
          Score: <span className="font-semibold">{job.score}</span>
        </p>
      </div>
      <p className="text-sm text-gray-500">{job.time.toLocaleString()}</p>
    </div>
  );
}

export default CardJob;
