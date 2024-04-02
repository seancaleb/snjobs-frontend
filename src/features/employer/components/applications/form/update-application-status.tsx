/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import { Spinner } from "@/components/elements";
import { Prompt } from "@/components/elements/prompt";
import { SelectField } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  UpdateApplicationFormValues,
  updateApplicationFormSchema,
} from "./schema";
import { useUpdateApplicationStatus } from "@/features/employer/api/use-update-application-status";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";
import { toast } from "sonner";

type UpdateApplicationStatusProps = {
  handleSetEditModeFalse: () => void;
  applicationStatus:
    | "Applied"
    | "Application viewed"
    | "Not selected by employer";
  jobId: string;
  applicationId: string;
};

const options = [
  { value: "Application viewed", label: "Application viewed" },
  { value: "Not selected by employer", label: "Not selected by employer" },
];

export const UpdateApplicationStatus = ({
  applicationStatus,
  handleSetEditModeFalse,
  jobId,
  applicationId,
}: UpdateApplicationStatusProps) => {
  const updateApplicationMutation = useUpdateApplicationStatus();
  const form = useForm<UpdateApplicationFormValues>({
    defaultValues:
      applicationStatus === "Applied"
        ? undefined
        : {
            status: applicationStatus,
          },
    resolver: zodResolver(updateApplicationFormSchema),
  });
  const { control, handleSubmit, formState, reset, getValues } = form;
  const { isDirty } = formState;

  const handleClickClose = () => {
    handleSetEditModeFalse();
    reset();
  };

  const onSubmit = (values: UpdateApplicationFormValues) => {
    updateApplicationMutation.mutate(
      {
        status: values.status,
        jobId,
        applicationId,
      },
      {
        onSuccess: ({ message }) => {
          const { title, description } = toastMessageFormatter(message);
          toast.success(title, { description });
          handleSetEditModeFalse();
        },
        onError: ({ message }) => {
          const { title, description } = toastMessageFormatter(message);
          toast.error(title, {
            description,
          });
        },
      }
    );
  };

  return (
    <>
      <Prompt hasUnsavedChanges={isDirty} />
      <Form {...form}>
        <form
          id="update-application-status-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-6 lg:items-start"
        >
          <SelectField
            control={control}
            name="status"
            placeholder="Select status"
            options={options}
          />

          <div className="flex flex-col md:flex-row gap-2 md:absolute top-6 right-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClickClose}
              className="order-2 md:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                updateApplicationMutation.isPending ||
                !isDirty ||
                !getValues("status")
              }
              className="order-1 md:order-2"
            >
              {updateApplicationMutation.isPending ? (
                <Spinner />
              ) : (
                <Save className="icon-start-btn" />
              )}
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
