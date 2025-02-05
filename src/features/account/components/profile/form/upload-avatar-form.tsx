/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner } from "@/components/elements";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateAvatar } from "@/features/account/api/use-update-avatar";
import { cn } from "@/lib/utils";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UploadAvatarFormValues, uploadAvatarFormSchema } from "./upload-avatar-form.schema";

export const UploadAvatarForm = () => {
  const updateAvatarMutation = useUpdateAvatar();
  const form = useForm<UploadAvatarFormValues>({
    resolver: zodResolver(uploadAvatarFormSchema),
  });

  const { formState, handleSubmit, watch } = form;
  const fileRef = form.register("file");
  const { errors } = formState;

  const onSubmit = (data: UploadAvatarFormValues) => {
    if (data.file) {
      const file = data.file[0];

      updateAvatarMutation.mutate(
        { avatar: file },
        {
          onSuccess: async ({ message }) => {
            const { title, description } = toastMessageFormatter(message);
            toast.success(title, {
              description,
            });
          },
          onError: ({ message }) => {
            const { title, description } = toastMessageFormatter(message);
            toast.success(title, {
              description,
            });
          },
        }
      );
    }
  };

  useEffect(() => {
    const subscription = watch(() => {
      handleSubmit(onSubmit)();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, handleSubmit]);

  useEffect(() => {
    if (errors.file) {
      toast.error(errors.file.message);
    }
  }, [errors.file]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={() => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    className="absolute bottom-0 text-transparent rounded-full cursor-pointer h-[30px] w-[30px] right-0 transform translate-x-[4px] translate-y-[4px] z-20 border-transparent"
                    {...fileRef}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button
          asChild
          size="icon"
          className={cn(
            "rounded-full h-[30px] w-[30px] absolute bottom-0 right-0 transform translate-x-[4px] translate-y-[4px] cursor-pointer"
          )}
        >
          <div>
            {updateAvatarMutation.isPending ? (
              <Spinner className="icon mr-0" />
            ) : (
              <Plus className="icon" />
            )}
          </div>
        </Button>
      </form>
    </Form>
  );
};
