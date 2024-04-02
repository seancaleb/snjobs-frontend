import { ToggleMenu } from "@/components/elements/toggle-menu";
import { Briefcase, Bookmark, Settings2, UserCircle2 } from "lucide-react";
import { NavigationItem } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { UserMenuDropdown } from "@/features/users";

const navLinks: NavigationItem[] = [
  {
    icon: <UserCircle2 className="icon-start" />,
    label: "Profile",
    path: "/user/profile",
  },
  {
    icon: <Briefcase className="icon-start" />,
    label: "Applied jobs",
    path: "/user/applied-jobs",
  },
  {
    icon: <Bookmark className="icon-start" />,
    label: "Bookmarked jobs",
    path: "/user/bookmarked-jobs",
  },
  {
    icon: <Settings2 className="icon-start" />,
    label: "Settings",
    path: "/user/settings",
  },
];

export const NavigationMenuClient = () => {
  const matches = useMediaQuery("(min-width: 40em)");

  return (
    <div>
      {matches ? (
        <UserMenuDropdown navLinks={navLinks} />
      ) : (
        <ToggleMenu navLinks={navLinks} />
      )}
    </div>
  );
};
