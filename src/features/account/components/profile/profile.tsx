import { ProfileAvatar } from "@/features/account/components/profile/profile-avatar";
import { User, Employer, Admin } from "@/features/account";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import _ from "lodash";
import { ShareProfileButton } from "./share-profile-button";

type ProfileProps = {
  user: User | Employer | Admin;
};

export const Profile = ({ user }: ProfileProps) => {
  return (
    <div>
      <div className="h-56 bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 dark:from-sky-300 dark:via-indigo-300 dark:to-purple-300 rounded-t-2xl" />

      <div className="px-0 sm:px-8 flex flex-col md:flex-row gap-6 sm:gap-8 md:items-start transform -translate-y-[88px] md:transform-none">
        <div className="grid gap-4 sm:gap-6 md:transform md:-translate-y-[88px]">
          <div className="h-44 w-44 p-1 rounded-full bg-background mx-auto md:mx-0">
            <ProfileAvatar user={user} className="h-full w-full text-3xl" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-3">
            <Button asChild>
              <Link to={`/${user.role}/settings`}>Edit profile</Link>
            </Button>
            <ShareProfileButton userId={user.userId} />
          </div>
        </div>

        <ProfileDetails user={user as User} />
      </div>
    </div>
  );
};

type ProfileDetailsProps = {
  user: User;
};

const ProfileDetails = ({ user }: ProfileDetailsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const matches = useMediaQuery("(min-width: 48em)");

  const name = `${user.firstName} ${user.lastName}`;
  const userDateCreated = format(user.createdAt, "PP");
  const role = user.role === "user" ? "Jobseeker" : user.role;
  const capitalizedRole = _.capitalize(role);

  const onResize = useCallback(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <div
      className="grid gap-4 sm:gap-6"
      style={{
        transform: matches
          ? `translateY(calc(-${height}px - 24px))`
          : "translateY(0px)",
      }}
    >
      <div
        ref={ref}
        className="grid gap-3 justify-items-start text-center md:text-left md:mb-6"
      >
        <h2 className="md:text-[#09090B]">{name}</h2>
        <Badge>{capitalizedRole}</Badge>
      </div>

      <div>
        <span className="muted">Email</span>
        <div className="text-base">{user.email}</div>
      </div>

      <div>
        <span className="muted">Member since</span>
        <div className="text-base">{userDateCreated}</div>
      </div>
    </div>
  );
};
