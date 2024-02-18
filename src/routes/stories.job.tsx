import { createFileRoute } from "@tanstack/react-router";
import HnListItem from "../HnListItems";

export const Route = createFileRoute("/stories/job")({
  component: StoriesJob,
});

function StoriesJob() {
  return (
    <>
      <div className="p-2">
        <HnListItem listType={"job"} />
      </div>
    </>
  );
}
