import { Link } from "@tanstack/react-router";
import { LIST_TYPE_OPTIONS, SortBy } from "./stories-navigation";

interface NavigationProps {
  sortBy: SortBy;
}

/**
 * A navigation component to switch between different lists of stories
 *
 * @param sortBy The sorting method to use after navigating
 * @returns A navigation component
 */
function Navigation({ sortBy }: NavigationProps) {
  return (
    <nav className="p-2 flex gap-2">
      {LIST_TYPE_OPTIONS.map((list) => (
        <Link
          key={list}
          to="/stories"
          search={{
            list,
            sortBy,
          }}
          className="[&.active]:font-bold"
        >
          {list}
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
