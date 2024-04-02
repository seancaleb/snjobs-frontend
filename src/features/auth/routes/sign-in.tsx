import { ContentLayout } from "@/components/layout";
import { SignInForm } from "../components/form/sign-in";
import { Header } from "../components/header";
import { useDocumentTitle } from "@mantine/hooks";

export const SignIn = () => {
  useDocumentTitle("Login - SNJOBS");

  return (
    <ContentLayout className="py-12 sm:py-16 flex flex-col items-center justify-center">
      <Header
        title="Sign in to your account"
        description="Sign in to access exclusive job features."
      />
      <SignInForm />
    </ContentLayout>
  );
};
