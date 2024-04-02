/* eslint-disable react-refresh/only-export-components */
import {
  Outlet,
  RouteObject,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ErrorRoute } from "./error";
import { useFitMobileBrowserHeight } from "@/hooks/use-fit-mobile-browser-height";
import { AnimatePresence } from "framer-motion";

const RootRoute = () => {
  const location = useLocation();

  useFitMobileBrowserHeight();

  return (
    <>
      <Toaster />
      <AnimatePresence mode="wait" initial={false}>
        <Outlet />
      </AnimatePresence>
      {!location.search && <ScrollRestoration />}
    </>
  );
};

export const initializeRoutes = (routes: RouteObject[]): RouteObject => ({
  element: <RootRoute />,
  children: routes,
  errorElement: <ErrorRoute />,
});
