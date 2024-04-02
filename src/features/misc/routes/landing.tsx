import { ContentLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <ContentLayout className="h-screen grid place-items-center">
      <div className="flex gap-3">
        <Button asChild>
          <Link to="/sign-in">Sign in</Link>
        </Button>
        <Button asChild>
          <Link to="/sign-up">Sign up</Link>
        </Button>
      </div>
    </ContentLayout>
  );
};
