import { createFileRoute } from "@tanstack/react-router";
import HnListItem from "../HnListItems";

export const Route = createFileRoute("/stories/ask")({
  component: StoriesAsk,
});

function StoriesAsk() {
  return (
    <>
      <div className="p-2">
        <HnListItem listType={"ask"} />
      </div>
    </>
  );
}
