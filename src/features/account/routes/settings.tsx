import { TabMenu } from "@/components/elements/tab-menu";
import { ContentLayout } from "@/components/layout";
import { useAppStore } from "@/stores";
import { Lock, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { DataLoader } from "@/components/elements";

type NavigationItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

const settingsLinks: NavigationItem[] = [
  {
    icon: <User className="icon-start" />,
    label: "Account details",
    path: "settings",
  },
  {
    icon: <Lock className="icon-start" />,
    label: "Privacy & security",
    path: "settings/privacy-and-security",
  },
];

export const Settings = () => {
  const title = "Settings";
  const subtitle = "Manage your account profile settings.";
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
        <Navigation links={settingsLinks} />
        {matches ? (
          <Outlet />
        ) : (
          <TabMenu key={location.pathname} links={settingsLinks}>
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
    <div className="max-w-[calc(16rem-16px)] w-full hidden lg:block">
      <ul className="space-y-1 list-none m-0">
        {links.map(({ label, path, icon }, idx) => {
          return (
            <li key={idx}>
              <NavLink
                to={`/${auth.role}/${path}`}
                end={location.pathname === `/${auth.role}/${path}`}
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
          );
        })}
      </ul>
    </div>
  );
};
