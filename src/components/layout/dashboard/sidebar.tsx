import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  MailCheck,
  Settings2,
  UserCircle2,
} from "lucide-react";
import { LogoutButton } from "@/features/auth";
import { NavigationItem } from "@/types";
import { AppLogo } from "@/components/misc";

const featureLinks: NavigationItem[] = [
  {
    icon: <LayoutDashboard className="icon-start" />,
    label: "Dashboard",
    path: "/employer/dashboard",
  },
  {
    icon: <Briefcase className="icon-start" />,
    label: "Job postings",
    path: "/employer/job-postings",
  },
  {
    icon: <MailCheck className="icon-start" />,
    label: "Applications",
    path: "/employer/applications",
  },
];

const accountLinks: NavigationItem[] = [
  {
    icon: <UserCircle2 className="icon-start" />,
    label: "Profile",
    path: "/employer/profile",
  },
  {
    icon: <Settings2 className="icon-start" />,
    label: "Settings",
    path: "/employer/settings",
  },
];

export const DashboardSidebar = () => {
  return (
    <aside className="fixed top-0 bottom-0 max-w-[16rem] w-full flex flex-col bg-background dark:bg-background border-r">
      <BrandLogo />
      <div className="px-4 p-6 flex flex-1 flex-col justify-between">
        <div className="space-y-4">
          <Navigation label="Features" links={featureLinks} />
          <Navigation label="Account" links={accountLinks} />
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
};

const BrandLogo = () => {
  return (
    <div className="px-6 h-[4.125rem] flex items-center">
      <AppLogo path="/employer/dashboard" />
    </div>
  );
};

type NavigationProps = {
  label: string;
  links: NavigationItem[];
};

const Navigation = ({ label, links }: NavigationProps) => {
  return (
    <div className="space-y-2">
      <span className="ml-4 uppercase font-medium text-[.625rem] text-muted-foreground">
        {label}
      </span>
      <ul className="space-y-1 list-none m-0">
        {links.map(({ label, path, icon }, idx) => (
          <li key={idx}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `group text-sm rounded-md px-4 py-2 h-9 font-medium flex items-center transition duration-300 hover:text-primary hover:bg-foreground/5 hover:dark:bg-primary-foreground hover:dark:text-primary ${
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
        ))}
      </ul>
    </div>
  );
};
