import { useForm } from "react-hook-form";
import {
  ProfileFormValues,
  profileFormSchema,
} from "./update-profile-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/form";
import { Prompt, Spinner } from "@/components/elements";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useUpdateProfile } from "../../../api/use-update-profile";
import { useAppStore } from "@/stores";
import { Role, useGetProfile } from "@/features/account";
import { toast } from "sonner";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";

export const UpdateProfileForm = () => {
  const updateProfileMutation = useUpdateProfile();
  const auth = useAppStore.use.auth();
  const profile = useGetProfile();
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: profile.data?.firstName || "",
      lastName: profile.data?.lastName || "",
      email: profile.data?.email || "",
    },
    resolver: zodResolver(profileFormSchema),
  });
  const { control, handleSubmit, formState, reset } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = (values: ProfileFormValues) => {
    if (!isDirty) {
      toast.success("Profile Updated", {
        description: "Profile has been successfully updated.",
      });

      return;
    }

    if (isValid) {
      updateProfileMutation.mutate(
        { updatedUser: values, role: auth.role as Role },
        {
          onSuccess: ({ firstName, lastName, email }) => {
            toast.success("Profile Updated", {
              description: "Profile has been successfully updated.",
            });
            reset({ firstName, lastName, email });
          },
          onError: ({ message }) => {
            const { title, description } = toastMessageFormatter(message);
            toast.error(title, {
              description,
            });
          },
        }
      );
    }
  };

  return (
    <>
      <Prompt hasUnsavedChanges={isDirty} />
      <Form {...form}>
        <form
          id="edit-job-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 items-start"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              control={control}
              name="firstName"
              label="First name"
              InputProps={{ disabled: updateProfileMutation.isPending }}
            />
            <InputField
              control={control}
              name="lastName"
              label="Last name"
              InputProps={{ disabled: updateProfileMutation.isPending }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-1">
              <InputField
                control={control}
                name="email"
                label="Email"
                InputProps={{ disabled: updateProfileMutation.isPending }}
              />
            </div>
            <div className="hidden sm:block col-span-1" />
            <div />
          </div>

          <div className="sm:ml-auto">
            <Button
              type="submit"
              className="w-full sm:w-fit"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? (
                <Spinner />
              ) : (
                <Save className="icon-start-btn" />
              )}
              Update profile
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
