import { ContentLayout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteProfile, UpdatePassword } from "@/features/account";
import { useDocumentTitle } from "@mantine/hooks";

export const PrivacyAndSecurity = () => {
  const title = "Privacy & security";
  const subtitle = "Manage your profile security.";

  useDocumentTitle("Account Security - SNJOBS");

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
          <div className="space-y-6">
            <UpdatePassword />
            <DeleteProfile />
          </div>
        </ContentLayout>
      </CardContent>
    </Card>
  );
};
