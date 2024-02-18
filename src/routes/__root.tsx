import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavigateToNews from "../NavigateToNews";

export const Route = createRootRoute({
  notFoundComponent: NavigateToNews,
  component: () => (
    <div className="p-2">
      <Outlet />
    </div>
  ),
});
