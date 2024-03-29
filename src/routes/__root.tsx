import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavigateToStories from "../components/NavigateToStories";

export const Route = createRootRoute({
  notFoundComponent: NavigateToStories,
  component: () => (
    <div className="p-2">
      <Outlet />
    </div>
  ),
});
