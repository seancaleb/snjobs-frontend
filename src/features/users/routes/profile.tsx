import { useDocumentTitle } from "@mantine/hooks";
import { DataLoader } from "@/components/elements";
import { ContentLayout } from "@/components/layout";
import { useGetProfile, Profile as UserProfile } from "@/features/account";

export const Profile = () => {
  const { data, isPending, isError, error } = useGetProfile();

  useDocumentTitle("Profile - SNJOBS");

  if (isError) {
    throw new Error(error.message);
  }

  if (isPending) {
    return <DataLoader data="profile" />;
  }

  return (
    <ContentLayout className="max-w-4xl mx-auto">
      <UserProfile user={data} />
    </ContentLayout>
  );
};
