import { Link } from "@tanstack/react-router";
import { LIST_TYPE_OPTIONS, Order, SortBy } from "../utils/stories-navigation";

interface NavigationProps {
  sortBy: SortBy;
  order: Order;
}

/**
 * A navigation component to switch between different lists of stories
 *
 * @param sortBy The sorting method to use after navigating
 * @param order The order to sort the stories after navigating
 * @returns A navigation component
 */
function Navigation({ sortBy, order }: NavigationProps) {
  return (
    <nav className="p-2 flex gap-2">
      {LIST_TYPE_OPTIONS.map((list) => (
        <Link
          key={list}
          to="/stories"
          search={{
            list,
            sortBy,
            order,
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
