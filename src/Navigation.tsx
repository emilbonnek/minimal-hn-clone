import { Link } from "@tanstack/react-router";
import { SortBy } from "./hackernews/types";

interface NavigationProps {
  sortBy: SortBy;
}

/**
 * A navigation component to switch between different lists of stories
 *
 * @param sortBy The sorting method
 * @returns A navigation component
 */
function Navigation({ sortBy }: NavigationProps) {
  return (
    <nav className="p-2 flex gap-2">
      <Link
        to="/stories"
        search={{
          list: "new",
          sortBy,
        }}
        className="[&.active]:font-bold"
      >
        New
      </Link>{" "}
      <Link
        to="/stories"
        search={{
          list: "top",
          sortBy,
        }}
        className="[&.active]:font-bold"
      >
        Top
      </Link>{" "}
      <Link
        to="/stories"
        search={{
          list: "best",
          sortBy,
        }}
        className="[&.active]:font-bold"
      >
        Best
      </Link>{" "}
      <Link
        to="/stories"
        search={{
          list: "ask",
          sortBy,
        }}
        className="[&.active]:font-bold"
      >
        Ask
      </Link>{" "}
      <Link
        to="/stories"
        search={{
          list: "show",
          sortBy,
        }}
        className="[&.active]:font-bold"
      >
        Show
      </Link>{" "}
      <Link
        to="/stories"
        search={{
          list: "job",
          sortBy,
        }}
        className="[&.active]:font-bold"
      >
        Job
      </Link>
    </nav>
  );
}

export default Navigation;
