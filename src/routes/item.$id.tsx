import { createFileRoute } from "@tanstack/react-router";
import { coerce, number, safeParse } from "valibot";
import NavigateToNews from "../NavigateToNews";
import HnItem from "../HnItem";

export const Route = createFileRoute("/item/$id")({
  component: Item,
});

function Item() {
  // Parse the id from the URL
  const { id: idString } = Route.useParams();
  const idParsed = safeParse(coerce(number(), Number), idString);
  if (!idParsed.success) {
    return <NavigateToNews />; // Redirect if the id is not a number
  }
  const id = idParsed.output;

  return (
    <>
      <div className="p-2">
        <HnItem id={id} />
      </div>
    </>
  );
}
