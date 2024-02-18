import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavigateToNews from "../NavigateToNews";

export const Route = createRootRoute({
  notFoundComponent: NavigateToNews,
  component: () => <Outlet />,
});
