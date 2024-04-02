export type JobDetails = {
  jobId: string;
  title: string;
  description: string;
  location: string;
  applications: string[];
  createdAt: string;
  employerName: string;
  requirements: string[];
};

export type EmployerJob = JobDetails & {
  employerId: string;
  updatedAt: string;
};

export type Application = {
  jobId: string;
  applicationId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type JobApplication = {
  total: number;
  jobApplications: (Application & {
    user: {
      firstName: string;
      lastName: string;
    };
  })[];
};

export type Role = "employer" | "admin" | "user";

export type NavigationItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};
