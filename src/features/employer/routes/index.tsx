import { lazyImport } from "@/utils/lazy-import";
import { RouteObject } from "react-router-dom";

const { JobPostings } = lazyImport(
  () => import("./job-postings"),
  "JobPostings"
);
const { Dashboard } = lazyImport(() => import("./dashboard"), "Dashboard");
const { Applications } = lazyImport(
  () => import("./applications"),
  "Applications"
);
const { JobPost } = lazyImport(() => import("./job-post"), "JobPost");
const { ApplicationsByJob } = lazyImport(
  () => import("./applications-by-job"),
  "ApplicationsByJob"
);
const { Application } = lazyImport(
  () => import("./application"),
  "Application"
);
const { CreateJob } = lazyImport(() => import("./create-job"), "CreateJob");
const { EditJob } = lazyImport(() => import("./edit-job"), "EditJob");
const { Profile } = lazyImport(() => import("./profile"), "Profile");

export const employerRoutes: RouteObject[] = [
  {
    path: "job-postings",
    element: <JobPostings />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "applications",
    element: <Applications />,
  },
  {
    path: "job-postings/:jobId",
    element: <JobPost />,
  },
  {
    path: "job-postings/:jobId/applications",
    element: <ApplicationsByJob />,
  },
  {
    path: "job-postings/:jobId/applications/:applicationId",
    element: <Application />,
  },
  {
    path: "job-postings/create",
    element: <CreateJob />,
  },
  {
    path: "job-postings/:jobId/edit",
    element: <EditJob />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];
