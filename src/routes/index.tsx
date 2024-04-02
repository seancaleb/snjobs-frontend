import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { useAppStore } from "@/stores";
import { initializeRoutes } from "./root";
import { employerRoute } from "./employer";
import { publicRoutes } from "./public";
import { notFoundRoute } from "./not-found";
import { userRoute } from "./user";
import { ExternalProfileDetails } from "@/features/misc";
import { ErrorRoute } from "./error";

export const AppRoutes = () => {
  const auth = useAppStore.use.auth();

  const protectedRoutes: RouteObject[] = [
    auth.role === "employer" ? employerRoute : userRoute,
    {
      path: "/users/info/:userId",
      element: <ExternalProfileDetails />,
      errorElement: <ErrorRoute />,
    },
  ];

  const routes: RouteObject[] = [
    initializeRoutes([
      ...(auth.isAuthenticated ? protectedRoutes : [publicRoutes]),
      notFoundRoute,
    ]),
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
