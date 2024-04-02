import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContentLayout } from "@/components/layout";
import { UpdateProfileAvatar, UpdateProfileForm } from "@/features/account";
import { useDocumentTitle } from "@mantine/hooks";

export const AccountDetails = () => {
  const title = "Account details";
  const subtitle = "Manage your profile details.";

  useDocumentTitle("Account Details - SNJOBS");

  return (
    <Card className="w-full border-0 lg:border">
      <CardHeader className="p-0 pb-6 lg:p-6">
        <div className="space-y-1.5">
          <CardTitle className="text-base tracking-normal">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0 lg:p-6">
        <ContentLayout className="p-0 lg:p-6 lg:py-0">
          <UpdateProfileAvatar />
          <UpdateProfileForm />
        </ContentLayout>
      </CardContent>
    </Card>
  );
};
