import { RouteObject } from "react-router-dom";
import { AccountDetails } from "./account-details";
import { PrivacyAndSecurity } from "./privacy-and-security";
import { Settings } from "./settings";
import { Transition } from "@/components/animations";
import { ErrorRoute } from "@/routes/error";

const settingsChildRoutes: RouteObject[] = [
  {
    index: true,
    element: <AccountDetails />,
  },
  {
    path: "privacy-and-security",
    element: <PrivacyAndSecurity />,
  },
];

export const settingsRoutes: RouteObject[] = [
  {
    path: "settings",
    element: <Settings />,
    children: settingsChildRoutes.map((route) => ({
      ...route,
      element: (
        <Transition className="relative w-full top-0">
          {route.element}
        </Transition>
      ),
      error: <ErrorRoute />,
    })),
  },
];
