import { Navigate } from "@tanstack/react-router";

/**
 * Redirect to the news page
 */
function NavigateToNews() {
  return (
    <Navigate
      to="/stories"
      search={{ list: "new", sortBy: "score", order: "asc" }}
    />
  );
}

export default NavigateToNews;
