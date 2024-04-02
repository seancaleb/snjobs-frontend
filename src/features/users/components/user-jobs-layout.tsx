import { DataLoader } from "@/components/elements";
import { TabMenu } from "@/components/elements/tab-menu";
import { ContentLayout } from "@/components/layout";
import { useAppStore } from "@/stores";
import { useMediaQuery } from "@mantine/hooks";
import { Bookmark, Briefcase } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

type NavigationItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

const jobLinks: NavigationItem[] = [
  {
    icon: <Briefcase className="icon-start" />,
    label: "Applied jobs",
    path: "applied-jobs",
  },
  {
    icon: <Bookmark className="icon-start" />,
    label: "Bookmarked jobs",
    path: "bookmarked-jobs",
  },
];

export const UserJobsLayout = () => {
  const title = "My Jobs";
  const subtitle = "Manage your bookmarked/applied jobs.";
  const matches = useMediaQuery("(min-width: 64em)");

  if (matches === undefined) {
    return <DataLoader />;
  }

  return (
    <ContentLayout
      title={title}
      subtitle={subtitle}
      className="relative max-w-6xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <Navigation links={jobLinks} />
        {matches ? (
          <Outlet />
        ) : (
          <TabMenu key={location.pathname} links={jobLinks}>
            <Outlet />
          </TabMenu>
        )}
      </div>
    </ContentLayout>
  );
};

type NavigationProps = {
  links: NavigationItem[];
};

const Navigation = ({ links }: NavigationProps) => {
  const auth = useAppStore.use.auth();

  return (
    <div className="max-w-[calc(16rem-16px)] w-full sticky top-6 h-min hidden lg:block">
      <ul className="space-y-1 list-none m-0">
        {links.map(({ label, path, icon }, idx) => {
          return (
            <li key={idx}>
              <NavLink
                to={`/${auth.role}/${path}`}
                className={({ isActive }) =>
                  `group text-sm rounded-md px-4 py-2 h-9 font-medium flex items-centertransition duration-300 hover:text-primary hover:bg-foreground/5 hover:dark:bg-primary-foreground hover:dark:text-primary ${
                    isActive
                      ? "bg-foreground/5 dark:bg-primary-foreground text-primary dark:text-primary"
                      : "text-muted-foreground"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
