import { lazyImport } from "@/utils/lazy-import";
import { RouteObject } from "react-router-dom";
import { ApplyJob, loader as applyJobLoader } from "./apply-job";
import { queryClient } from "@/lib/react-query";
import { Transition } from "@/components/animations";

const { Jobs } = lazyImport(() => import("./jobs"), "Jobs");
const { Job } = lazyImport(() => import("./job"), "Job");

export const jobRoutes: RouteObject[] = [
  {
    path: "jobs",
    element: <Jobs />,
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    children: [
      {
        path: "apply",
        element: (
          <Transition className="relative top-0 w-full lg:w-auto lg:basis-[448px] shrink-0">
            <ApplyJob />
          </Transition>
        ),
        loader: applyJobLoader(queryClient),
      },
    ],
  },
];
