import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

type ApplicantsBadgeProps = {
  totalApplications: number;
};

export const ApplicantsBadge = ({
  totalApplications,
}: ApplicantsBadgeProps) => {
  return totalApplications !== 0 ? (
    <Badge variant="accent" className="self-start whitespace-nowrap">
      <User className="icon mr-1" />
      {totalApplications} applicant
      {totalApplications > 1 ? "s" : ""}
    </Badge>
  ) : null;
};
