import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

type EmptyJobListProps = {
  title: string;
  description: string;
};

export const EmptyJobList = ({ title, description }: EmptyJobListProps) => {
  return (
    <div className="text-center p-6 grid place-items-center w-full">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="font-semibold text-xl tracking-[-.015em]">
            {title}
          </div>
          <p className="muted">{description}</p>
        </div>
        <Button asChild>
          <Link to="/jobs">
            Find jobs <MoveRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
