/* eslint-disable react-refresh/only-export-components */
import { Suspense, useEffect } from "react";
import {
  Outlet,
  RouteObject,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ErrorRoute } from "./error";
import { DataLoader } from "@/components/elements";
import { useGetProfile } from "@/features/account/api/use-get-profile";
import { settingsRoutes } from "@/features/account";
import { PlatformLayout } from "@/components/layout";
import { usersRoutes } from "@/features/users/routes";
import { jobRoutes } from "@/features/jobs";
import { Transition } from "@/components/animations";

const UserRoute = () => {
  const profile = useGetProfile();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/jobs?page=1");
    }
  }, [location, navigate]);

  if (profile.isError) {
    throw new Error(profile.error.message);
  }

  if (profile.isPending) {
    return (
      <div className="min-h-screen">
        <DataLoader data="profile" />
      </div>
    );
  }

  return (
    <PlatformLayout>
      <Suspense fallback={<DataLoader />}>
        <Outlet />
      </Suspense>
    </PlatformLayout>
  );
};

export const userRoute: RouteObject = {
  path: "/",
  element: <UserRoute />,
  children: [
    {
      path: "user",
      children: [
        ...usersRoutes.map((route) => ({
          ...route,
          errorElement: <ErrorRoute />,
        })),
        ...settingsRoutes.map((route) => ({
          ...route,
          errorElement: <ErrorRoute />,
        })),
      ],
    },
    ...jobRoutes.map((route) => ({
      ...route,
      element: <Transition>{route.element}</Transition>,
      errorElement: <ErrorRoute />,
    })),
  ],
  errorElement: <ErrorRoute />,
};
