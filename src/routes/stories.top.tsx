import { createFileRoute } from "@tanstack/react-router";
import HnListItem from "../HnListItems";

export const Route = createFileRoute("/stories/top")({
  component: StoriesTop,
});

function StoriesTop() {
  return (
    <>
      <div className="p-2">
        <HnListItem listType={"top"} />
      </div>
    </>
  );
}
