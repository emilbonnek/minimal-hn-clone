import { Navigate } from "@tanstack/react-router";

/**
 * Redirect to the news page
 */
function NavigateToNews() {
  return <Navigate to="/stories/new" />;
}

export default NavigateToNews;
