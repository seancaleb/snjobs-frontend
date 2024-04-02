/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import { useEffect, useRef, useState } from "react";
import { ContentLayout } from "@/components/layout";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobFormValues, jobFormSchema } from "./schema";
import { InputField, SelectField, TextareaField } from "@/components/form";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { UnsavedChangesDialog } from "@/components/elements/unsaved-changes-dialog";
import { Prompt } from "@/components/elements/prompt";
import { useEditJobPost } from "@/features/employer/api/use-edit-job-post";
import { Spinner } from "@/components/elements";
import { toast } from "sonner";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";
import { DEFAULT_CITIES, JobPost } from "@/features/jobs";

type EditJobFormProps = {
  job: JobPost;
};

const defaultCitiesOptions = DEFAULT_CITIES.map((city) => ({
  value: city,
  label: city,
}));

export const EditJobForm = ({ job }: EditJobFormProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpenUnsavedChanges, setIsOpenUnsavedChanges] = useState(false);
  const hasComponentRendered = useRef(false);
  const form = useForm<JobFormValues>({
    defaultValues: {
      title: job.title,
      description: job.description,
      location: job.location as JobFormValues["location"],
      requirements: job.requirements.map((req) => ({ requirement: req })),
    },
    resolver: zodResolver(jobFormSchema),
  });
  const { control, handleSubmit, formState } = form;
  const { errors, isDirty, isSubmitSuccessful, isValid } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "requirements",
    control,
  });
  const navigate = useNavigate();
  const editJobMutation = useEditJobPost();

  const onSubmit = (values: JobFormValues) => {
    const modifiedRequirements = values.requirements.map(
      (req) => req.requirement
    );

    const updatedValues = {
      ...values,
      requirements: modifiedRequirements,
    };

    if (isValid) {
      editJobMutation.mutate(
        {
          updatedJobPost: updatedValues,
          jobId: job.jobId,
        },
        {
          onSuccess: ({ message }) => {
            const { title, description } = toastMessageFormatter(message);
            toast.success(title, { description });

            navigate(`/employer/job-postings/${job.jobId}`, {
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

  const handleUnsavedOnClose = () => {
    setIsOpenUnsavedChanges(false);
    navigate(`/employer/job-postings/${job.jobId as string}`, {
      replace: true,
    });
  };

  const handleEditOnClose = () => {
    if (isDirty) setIsOpenUnsavedChanges(true);
    else
      navigate(`/employer/job-postings/${job.jobId as string}`, {
        replace: true,
      });
  };

  const handleClickAddRequirement = () => append({ requirement: "" });
  const handleClickRemoveRequirement = (idx: number) => remove(idx);

  const scrollToLastElement = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    if (hasComponentRendered.current) {
      scrollToLastElement();
    }

    hasComponentRendered.current = true;
  }, [fields]);

  return (
    <ContentLayout
      ref={containerRef}
      variant="card"
      className="p-0 md:p-6 md:px-0"
    >
      {isOpenUnsavedChanges ? null : (
        <Prompt hasUnsavedChanges={isDirty && !isSubmitSuccessful} />
      )}
      <Form {...form}>
        <form
          id="edit-job-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 items-start"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              control={control}
              name="title"
              label="Job title"
              InputProps={{
                disabled: editJobMutation.isPending,
              }}
            />

            <SelectField
              control={control}
              label="Location"
              name="location"
              placeholder="Select location"
              description=" Select a designated location for this new job opportunity."
              options={defaultCitiesOptions}
              SelectProps={{
                disabled: editJobMutation.isPending,
              }}
            />
          </div>

          <TextareaField
            control={control}
            name="description"
            label="Job description"
            TextareaProps={{
              disabled: editJobMutation.isPending,
            }}
          />

          <div className="space-y-4">
            <FormLabel
              className={cn(errors.requirements && "text-destructive")}
            >
              Job requirements
            </FormLabel>
            <div className="space-y-4">
              {fields.map((field, idx) => {
                return (
                  <div key={field.id} className="flex gap-2">
                    <InputField
                      control={control}
                      name={`requirements.${idx}.requirement`}
                      InputProps={{
                        disabled: editJobMutation.isPending,
                      }}
                    />
                    {idx > 0 ? (
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        onClick={() => handleClickRemoveRequirement(idx)}
                        disabled={editJobMutation.isPending}
                      >
                        <Trash2 className="icon-btn" />
                      </Button>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleClickAddRequirement}
              disabled={editJobMutation.isPending}
            >
              <Plus className="icon-start" />
              Requirement
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:absolute top-6 right-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleEditOnClose}
              disabled={editJobMutation.isPending}
              className="order-2 md:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || editJobMutation.isPending}
              className="order-1 md:order-2"
            >
              {editJobMutation.isPending ? (
                <Spinner />
              ) : (
                <Save className="icon-start-btn" />
              )}
              Save changes
            </Button>
          </div>
        </form>
      </Form>

      <UnsavedChangesDialog
        isOpen={isOpenUnsavedChanges}
        setIsOpen={setIsOpenUnsavedChanges}
        onClose={handleUnsavedOnClose}
      />
    </ContentLayout>
  );
};
