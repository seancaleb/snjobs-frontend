import { Prompt, Spinner } from "@/components/elements";
import { InputField, TextareaField } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import { Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApplyJobFormValues, applyJobSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplyJob } from "@/features/users/api/use-apply-job";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ApplyJobFormProps = {
  jobId: string;
};

export const ApplyJobForm = ({ jobId }: ApplyJobFormProps) => {
  const form = useForm<ApplyJobFormValues>({
    defaultValues: {
      resume: "",
      coverLetter: "",
    },
    resolver: zodResolver(applyJobSchema),
  });
  const { control, handleSubmit, formState } = form;
  const { isDirty, isValid } = formState;
  const applyJobMutation = useApplyJob();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ApplyJobFormValues> = (credentials) => {
    if (isValid) {
      applyJobMutation.mutate(
        { credentials, jobId },
        {
          onSuccess: ({ message }) => {
            const { title, description } = toastMessageFormatter(message);
            toast.success(title, { description });

            navigate(`/jobs/${jobId}`, {
              replace: true,
            });
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
      <Prompt hasUnsavedChanges={isDirty && !applyJobMutation.isPending} />
      <Form {...form}>
        <form
          id="apply-job-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 w-full"
        >
          <InputField
            control={control}
            name="resume"
            label="Resume"
            InputProps={{
              disabled: applyJobMutation.isPending,
              className: "w-full",
            }}
          >
            <FormDescription>
              Make sure to include a working URL link to your resume.
            </FormDescription>
          </InputField>

          <TextareaField
            control={control}
            name="coverLetter"
            label="Cover letter"
            TextareaProps={{
              disabled: applyJobMutation.isPending,
              className: "w-full",
            }}
          />

          <div className="self-start">
            <Button type="submit" disabled={applyJobMutation.isPending}>
              {applyJobMutation.isPending ? (
                <Spinner />
              ) : (
                <Send className="icon-start-btn" />
              )}
              Submit application
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
