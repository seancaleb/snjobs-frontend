import { DataLoader } from "@/components/elements";
import { ContentLayout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { useGetProfileDetails } from "@/features/account";
import { ProfileAvatar } from "@/features/account/components/profile/profile-avatar";
import { useDocumentTitle } from "@mantine/hooks";
import { useParams } from "react-router";
import _ from "lodash";
import { AppLogo } from "@/components/misc";

type RouteParams = {
  userId: string;
};

export const ExternalProfileDetails = () => {
  const { userId } = useParams<RouteParams>();
  const { data, isPending, isError, error } = useGetProfileDetails({
    userId: userId as string,
  });

  const name = `${data?.firstName} ${data?.lastName}`;
  const role = data?.role === "user" ? "Jobseeker" : data?.role;
  const capitalizedRole = _.capitalize(role);
  const truncatedName = _.truncate(name, {
    length: 30,
    separator: " ",
    omission: "",
  });

  useDocumentTitle(`${data ? truncatedName : "User"} - SNJOBS`);

  if (isError) {
    throw new Error(error.message);
  }

  if (isPending) {
    return <DataLoader data="user details" />;
  }

  return (
    <ContentLayout className="max-w-2xl mx-auto">
      <AppLogo />
      <div>
        <div className="h-56 bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 dark:from-sky-300 dark:via-indigo-300 dark:to-purple-300 rounded-t-2xl" />

        <div className="px-0 sm:px-8 flex flex-col md:flex-row gap-6 sm:gap-8 md:items-start transform -translate-y-[88px] md:transform-none">
          <div className="grid gap-4 justify-items-center sm:gap-6 md:transform md:-translate-y-[88px] w-full">
            <div className="h-44 w-44 p-1 rounded-full bg-background">
              <ProfileAvatar user={data} className="h-full w-full text-3xl" />
            </div>

            <div className="grid gap-3 justify-items-center text-center">
              <h2>{name}</h2>
              <Badge>{capitalizedRole}</Badge>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
