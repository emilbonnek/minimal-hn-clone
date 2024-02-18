import { createFileRoute } from "@tanstack/react-router";
import HnListItem from "../HnListItems";

export const Route = createFileRoute("/stories/new")({
  component: StoriesNew,
});

function StoriesNew() {
  return (
    <>
      <div className="p-2">
        <HnListItem listType={"new"} />
      </div>
    </>
  );
}
