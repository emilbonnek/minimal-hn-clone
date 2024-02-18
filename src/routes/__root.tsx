import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import NavigateToNews from "../NavigateToNews";

export const Route = createRootRoute({
  notFoundComponent: NavigateToNews,
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/stories/new" className="[&.active]:font-bold">
          New
        </Link>{" "}
        <Link to="/stories/top" className="[&.active]:font-bold">
          Top
        </Link>{" "}
        <Link to="/stories/best" className="[&.active]:font-bold">
          Best
        </Link>
        {""}
        <Link to="/stories/ask" className="[&.active]:font-bold">
          Ask
        </Link>{" "}
        <Link to="/stories/show" className="[&.active]:font-bold">
          Show
        </Link>{" "}
        <Link to="/stories/job" className="[&.active]:font-bold">
          Job
        </Link>
      </div>
      <hr />
      <div className="p-2">
        <Outlet />
      </div>
    </>
  ),
});
