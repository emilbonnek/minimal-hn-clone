import { parse } from "valibot";
import {
  ORDER_OPTIONS,
  Order,
  OrderSchema,
  SORT_BY_OPTIONS,
  SortBy,
  SortBySchema,
} from "./stories-navigation";

interface FormSortingProps {
  sortBy: SortBy;
  order: Order;
  onChangeSortBy: (newSortBy: SortBy) => void;
  onChangeOrder: (newOrder: Order) => void;
}

/**
 * A form to allow the user to sort the list of items.
 * *
 * @param sortBy The current sort term
 * @param order The current sort order
 * @param onChangeSortBy A function to call when the sort term changes
 * @param onChangeOrder A function to call when the sort order changes
 */
function FormSorting({
  sortBy,
  order,
  onChangeSortBy,
  onChangeOrder,
}: FormSortingProps) {
  return (
    <form>
      <div>
        <label htmlFor="sortBy">Sort by:</label>
        <select
          name="sortBy"
          value={sortBy}
          onChange={(e) => {
            const newSortBy = parse(SortBySchema, e.target.value);
            onChangeSortBy(newSortBy);
          }}
        >
          {SORT_BY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="order">Order:</label>
        <select
          name="order"
          value={order}
          onChange={(e) => {
            const newOrder = parse(OrderSchema, e.target.value);
            onChangeOrder(newOrder);
          }}
        >
          {ORDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default FormSorting;
