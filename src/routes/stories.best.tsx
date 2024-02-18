import { createFileRoute } from "@tanstack/react-router";
import HnListItem from "../HnListItems";

export const Route = createFileRoute("/stories/best")({
  component: StoriesBest,
});

function StoriesBest() {
  return (
    <>
      <div className="p-2">
        <HnListItem listType={"best"} />
      </div>
    </>
  );
}
