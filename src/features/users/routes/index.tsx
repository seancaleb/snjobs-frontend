import { RouteObject } from "react-router-dom";
import { UserJobsLayout } from "../components/user-jobs-layout";
import { AppliedJobs } from "./applied-jobs";
import { BookmarkedJobs } from "./bookmarked-jobs";
import { ErrorRoute } from "@/routes/error";
import { Transition } from "@/components/animations";
import { Profile } from "./profile";

const usersChildRoutes: RouteObject[] = [
  {
    path: "applied-jobs",
    element: <AppliedJobs />,
  },
  {
    path: "bookmarked-jobs",
    element: <BookmarkedJobs />,
  },
];

export const usersRoutes: RouteObject[] = [
  {
    path: "",
    element: <UserJobsLayout />,
    children: usersChildRoutes.map((route) => ({
      ...route,
      element: (
        <Transition className="relative w-full top-0">
          {route.element}
        </Transition>
      ),
      errorElement: <ErrorRoute />,
    })),
  },
  {
    path: "profile",
    element: (
      <Transition className="relative w-full top-0">
        <Profile />
      </Transition>
    ),
    errorElement: <ErrorRoute />,
  },
];
