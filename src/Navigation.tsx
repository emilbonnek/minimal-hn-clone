import { Link } from "@tanstack/react-router";
import { Amount, LIST_TYPE_OPTIONS, SortBy } from "./stories-navigation";

interface NavigationProps {
  sortBy: SortBy;
  amount: Amount;
}

/**
 * A navigation component to switch between different lists of stories
 *
 * @param amount The amount of stories to show
 * @param sortBy The sorting method
 * @returns A navigation component
 */
function Navigation({ sortBy, amount }: NavigationProps) {
  return (
    <nav className="p-2 flex gap-2">
      {LIST_TYPE_OPTIONS.map((list) => (
        <Link
          key={list}
          to="/stories"
          search={{
            list,
            amount,
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
