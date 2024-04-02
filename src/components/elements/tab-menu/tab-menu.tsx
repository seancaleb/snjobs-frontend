import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/stores";
import { NavigationItem, Role } from "@/types";
import { generateKey } from "@/utils/generate-key";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type TabMenuProps = {
  children: ReactNode;
  links: Omit<NavigationItem, "icon">[];
};

const initializerFn = (role: Role, links: Omit<NavigationItem, "icon">[]) => {
  return links.find((link) => `/${role}/${link.path}` === location.pathname)
    ?.path;
};

export const TabMenu = ({ children, links }: TabMenuProps) => {
  const location = useLocation();
  const auth = useAppStore.use.auth();
  const [defaultPath, setDefaultPath] = useState(() =>
    initializerFn(auth.role!, links)
  );

  useEffect(() => {
    setDefaultPath(initializerFn(auth.role!, links));
  }, [auth.role, links, location.pathname]);

  return (
    <Tabs
      value={`${auth.role}/${defaultPath}`}
      defaultValue={`${auth.role}/${defaultPath}`}
      className="grid gap-6"
    >
      <TabsList className="grid w-full grid-cols-2">
        {links.map((link) => (
          <TabsTrigger
            asChild
            key={`tab-item-${generateKey(link.path)}`}
            value={`${auth.role}/${link.path}`}
          >
            <Link to={`/${auth.role}/${link.path}`}>{link.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <div>{children}</div>
    </Tabs>
  );
};
