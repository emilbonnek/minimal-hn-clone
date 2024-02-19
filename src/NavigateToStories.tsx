import { Navigate } from "@tanstack/react-router";

/**
 * Redirect to the stories page with the "new" list type, sorted by score, and in ascending order
 */
function NavigateToStories() {
  return (
    <Navigate
      to="/stories"
      search={{ list: "new", sortBy: "score", order: "asc" }}
    />
  );
}

export default NavigateToStories;
