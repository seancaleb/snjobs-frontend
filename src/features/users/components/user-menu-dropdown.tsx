import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetProfile } from "@/features/account";
import { useLogout } from "@/features/auth";
import { useLogoutUser } from "@/hooks/use-logout-user";
import { Link } from "react-router-dom";
import { NavigationItem } from "@/types";
import { generateKey } from "@/utils/generate-key";
import _ from "lodash";

type UserMenuDropdownProps = {
  navLinks: NavigationItem[];
};

export const UserMenuDropdown = ({ navLinks }: UserMenuDropdownProps) => {
  const profile = useGetProfile();
  const logoutMutation = useLogout();
  const { handleLogoutUser } = useLogoutUser({ mutation: logoutMutation });

  const firstName = _.truncate(profile.data?.firstName, {
    length: 18,
    separator: " ",
    omission: "",
  });
  const name = `${firstName} ${profile.data?.lastName[0]}.`;
  const role = profile.data?.role === "user" ? "Jobseeker" : profile.data?.role;
  const capitalizedRole = _.capitalize(role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex space-x-1 items-center text-sm">
        <span>{firstName}</span> <ChevronDown className="icon-end" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel className="space-y-1">
          <div>{name}</div>
          <Badge>{capitalizedRole}</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navLinks.map((link) => (
          <DropdownMenuItem key={`dropdown-${generateKey(link.label)}`} asChild>
            <Link to={link.path}>
              {link.icon}
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutUser}>
          <LogOut className="icon-start" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
