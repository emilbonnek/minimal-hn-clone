import { createFileRoute } from "@tanstack/react-router";
import HnListItem from "../HnListItems";

export const Route = createFileRoute("/stories/show")({
  component: StoriesShow,
});

function StoriesShow() {
  return (
    <>
      <div className="p-2">
        <HnListItem listType={"show"} />
      </div>
    </>
  );
}
