import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoutButton } from "@/features/auth";
import { useGetProfile } from "@/features/account";
import { NavigationItem } from "@/types";
import { AppLogo } from "@/components/misc";
import { generateKey } from "@/utils/generate-key";
import _ from "lodash";

type NavbarProps = {
  navLinks: NavigationItem[];
};

export const ToggleMenu = ({ navLinks }: NavbarProps) => {
  const profile = useGetProfile();

  const firstName = _.truncate(profile.data?.firstName, {
    length: 18,
    separator: " ",
    omission: "",
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="icon" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col gap-6 justify-between h-full">
          <div className="grid gap-6">
            <AppLogo />
            <div className="grid gap-4">
              <div className="px-4 py-2 rounded-md break-words border">
                <span className="text-base">Hello, {firstName}! 👋🏻</span>
              </div>
              <Navigation links={navLinks} />
            </div>
          </div>
          <LogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

type NavigationProps = {
  links: NavigationItem[];
};

const Navigation = ({ links }: NavigationProps) => {
  return (
    <div className="space-y-2">
      <ul className="space-y-1 list-none m-0">
        {links.map(({ label, path, icon }, idx) => (
          <li key={`nav-${generateKey(path)}-${idx}`}>
            <SheetClose asChild>
              <Link
                to={path}
                className="group text-sm rounded-md px-4 py-2 h-9 font-medium flex items-center transition duration-300 hover:text-primary hover:bg-foreground/5 hover:dark:bg-primary-foreground hover:dark:text-primary text-muted-foreground"
              >
                {icon}
                {label}
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    </div>
  );
};
