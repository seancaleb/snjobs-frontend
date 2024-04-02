/* eslint-disable react-refresh/only-export-components */
import { NotFound } from "@/features/misc";
import { RouteObject } from "react-router-dom";

/**
 * Todo:
 * - Implement <NotFoundRoute/> component
 */
// const NotFoundRoute = () => {
//   return (
//     <div className="grid gap-1 text-center">
//       <div className="text-3xl font-bold">🚨</div>
//       <div className="text-2xl font-bold">You seem to be lost</div>
//       <p className="text-muted-foreground">Route doesn't exist yet.</p>
//     </div>
//   );
// };

export const notFoundRoute: RouteObject = {
  path: "*",
  element: <NotFound />,
};
