/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { DashboardLayout } from "@/components/layout";
import { employerRoutes } from "@/features/employer";
import { ErrorRoute } from "./error";
import { DataLoader } from "@/components/elements";
import { useGetProfile } from "@/features/account/api/use-get-profile";
import { settingsRoutes } from "@/features/account";
import { Transition } from "@/components/animations";

const EmployerRoute = () => {
  const profile = useGetProfile();

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
    <DashboardLayout>
      <Suspense fallback={<DataLoader className="top-[4.125rem]" />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
};

export const employerRoute: RouteObject = {
  path: "employer",
  element: <EmployerRoute />,
  children: [
    ...employerRoutes.map((route) => ({
      ...route,
      element: <Transition>{route.element}</Transition>,
      errorElement: <ErrorRoute />,
    })),
    ...settingsRoutes.map((route) => ({
      ...route,
      element: <Transition childKey="settings">{route.element}</Transition>,
      errorElement: <ErrorRoute />,
    })),
  ],
  errorElement: <ErrorRoute />,
};
