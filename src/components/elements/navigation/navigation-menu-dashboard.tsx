import { ToggleMenu } from "@/components/elements/toggle-menu";
import {
  Briefcase,
  LayoutDashboard,
  MailCheck,
  Settings2,
  UserCircle2,
} from "lucide-react";
import { NavigationItem } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { useGetProfile } from "@/features/account";
import { ProfileAvatar } from "@/features/account/components/profile/profile-avatar";
import _ from "lodash";

const navLinks: NavigationItem[] = [
  {
    icon: <UserCircle2 className="icon-start" />,
    label: "Profile",
    path: "/employer/profile",
  },
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
  {
    icon: <Settings2 className="icon-start" />,
    label: "Settings",
    path: "/employer/settings",
  },
];

export const NavigationMenuDashboard = () => {
  const matches = useMediaQuery("(min-width: 80em)");
  const profile = useGetProfile();

  const firstName = _.truncate(profile.data?.firstName, {
    length: 18,
    separator: " ",
    omission: "",
  });
  const name = `${firstName} ${profile.data?.lastName[0]}.`;

  return (
    <div>
      {matches ? (
        <div className="flex gap-4">
          <div className="text-right">
            <div className="font-medium">{name}</div>
            <div className="muted">{profile.data?.email}</div>
          </div>
          <ProfileAvatar user={profile.data} />
        </div>
      ) : (
        <ToggleMenu navLinks={navLinks} />
      )}
    </div>
  );
};
