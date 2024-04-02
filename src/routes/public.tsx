/* eslint-disable react-refresh/only-export-components */
import { Suspense, useEffect } from "react";
import {
  Outlet,
  RouteObject,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { authRoutes } from "@/features/auth";
import { ErrorRoute } from "./error";
import { DataLoader } from "@/components/elements";
import { Transition } from "@/components/animations";
import { ExternalProfileDetails } from "@/features/misc";

const PublicRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/sign-in");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen">
      <Suspense fallback={<DataLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export const publicRoutes: RouteObject = {
  path: "/",
  element: <PublicRoutes />,
  children: [
    ...authRoutes.map((route) => ({
      ...route,
      element: <Transition className="top-0">{route.element}</Transition>,
      errorElement: <ErrorRoute />,
    })),
    {
      path: "/users/info/:userId",
      element: <ExternalProfileDetails />,
      errorElement: <ErrorRoute />,
    },
  ],
  errorElement: <ErrorRoute />,
};
