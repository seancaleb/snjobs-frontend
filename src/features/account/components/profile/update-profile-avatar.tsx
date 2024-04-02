import { Badge } from "@/components/ui/badge";
import { ProfileAvatar } from "./profile-avatar";
import { UploadAvatarForm } from "./form/upload-avatar-form";
import { useGetProfile } from "../..";
import _ from "lodash";

export const UpdateProfileAvatar = () => {
  const profile = useGetProfile();

  const fullName = `${profile.data?.firstName} ${profile.data?.lastName}`;
  const role = profile.data?.role === "user" ? "Jobseeker" : profile.data?.role;
  const capitalizedRole = _.capitalize(role);

  return (
    <div className="flex gap-6 items-center">
      <div className="relative w-fit">
        <ProfileAvatar
          user={profile.data}
          className="h-[5rem] w-[5rem] self-center sm:self-auto text-lg"
        />
        <UploadAvatarForm />
      </div>

      <div className="space-y-1">
        <div className="large">{fullName}</div>
        <Badge>{capitalizedRole}</Badge>
      </div>
    </div>
  );
};
