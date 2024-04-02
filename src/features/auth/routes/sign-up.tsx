import { ContentLayout } from "@/components/layout";
import { Header } from "../components/header";
import { SignUpForm } from "../components/form/sign-up";
import { useDocumentTitle } from "@mantine/hooks";

export const SignUp = () => {
  useDocumentTitle("Register - SNJOBS");

  return (
    <ContentLayout className="py-12 sm:py-16 flex flex-col items-center justify-center">
      <Header
        title="Create an account"
        description="Sign up to explore exclusive job opportunities."
      />
      <SignUpForm />
    </ContentLayout>
  );
};
