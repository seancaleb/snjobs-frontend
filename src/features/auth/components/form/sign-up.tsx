/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { RegisterFormValues, registerFormSchema } from "./schema";
import { useCounter } from "@mantine/hooks";
import { Badge } from "@/components/ui/badge";
import {
  InputField,
  PasswordVisibilityToggle,
  SelectField,
} from "@/components/form";
import { ContentLayout } from "@/components/layout";
import { useRegister } from "../../api/use-register";
import { toast } from "sonner";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";
import { Spinner } from "@/components/elements";
import { cn } from "@/lib/utils";
import { useLoginUser } from "@/hooks/use-login-user";
import { useLogin } from "../../api/use-login";

export const SignUpForm = () => {
  const registerMutation = useRegister();
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });
  const { control, handleSubmit, formState, setFocus, getValues } = form;
  const { isValid, dirtyFields, errors } = formState;
  const [count, handlers] = useCounter(0, { min: 0, max: 2 });
  const loginMutation = useLogin();
  const { handleLoginUser } = useLoginUser({ mutation: loginMutation });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (credentials) => {
    if (isValid) {
      const registerPromise = registerMutation.mutateAsync({ credentials });

      toast.promise(registerPromise, {
        loading: "Registering your account...",
        success: ({ message }) => {
          const { title } = toastMessageFormatter(message);
          return title;
        },
        error: ({ message }) => {
          const { title } = toastMessageFormatter(message);
          return title;
        },
        description: ({ message }) => {
          const { description } = toastMessageFormatter(message);
          return description;
        },
      });
    }
  };

  useEffect(() => {
    if (count === 1) setFocus("firstName");
    else if (count === 2) setFocus("email");
  }, [count, setFocus]);

  useEffect(() => {
    if (registerMutation.isSuccess) {
      handleLoginUser({
        email: getValues("email"),
        password: getValues("password"),
      });
    }
  }, [registerMutation.isSuccess]);

  return (
    <ContentLayout
      variant="card"
      className="max-w-md w-full sm:p-8 border rounded-xl bg-card"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Step {count + 1} / 3</Badge>
        </div>
      </div>

      <Form {...form}>
        <form
          id="register-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          {count === 0 && (
            <SelectField
              control={control}
              label="Role"
              name="role"
              placeholder="Select a role"
              description=" Select your role to indicate whether you are a jobseeker or an employer."
              options={[
                { value: "user", label: "Jobseeker" },
                { value: "employer", label: "Employer" },
              ]}
            />
          )}

          {count === 1 && (
            <>
              <InputField
                control={control}
                name="firstName"
                placeholder="Enter your first name"
                label="First name"
              />

              <InputField
                control={control}
                name="lastName"
                placeholder="Enter your last name"
                label="Last name"
              />
            </>
          )}

          {count === 2 && (
            <>
              <InputField
                control={control}
                name="email"
                placeholder="Enter your email"
                InputProps={{
                  disabled: registerMutation.isPending,
                }}
                label="Email"
              />

              <InputField
                control={control}
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                InputProps={{
                  disabled: registerMutation.isPending,
                }}
                label="Password"
              >
                <PasswordVisibilityToggle
                  isVisible={isVisible}
                  onToggle={() => setIsVisible(!isVisible)}
                  CheckboxProps={{
                    disabled: registerMutation.isPending,
                  }}
                />
              </InputField>
            </>
          )}

          <div className="flex justify-between">
            {count !== 0 ? (
              <Button
                type="button"
                onClick={handlers.decrement}
                variant="ghost"
                disabled={registerMutation.isPending}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {count === 0 && (
              <Button
                type="button"
                onClick={handlers.increment}
                disabled={!dirtyFields.role}
              >
                Continue
              </Button>
            )}

            {count === 1 && (
              <Button
                type="button"
                onClick={handlers.increment}
                disabled={
                  !!errors.firstName ||
                  !!errors.lastName ||
                  !dirtyFields.firstName ||
                  !dirtyFields.lastName
                }
              >
                Continue
              </Button>
            )}

            {count === 2 && (
              <Button type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending && <Spinner />}
                Sign up
              </Button>
            )}
          </div>

          <div className="muted">
            Have an account?{" "}
            <Link
              to="/sign-in"
              className={cn(
                "text-indigo-700",
                registerMutation.isPending && "pointer-events-none"
              )}
            >
              Sign in.
            </Link>
          </div>
        </form>
      </Form>
    </ContentLayout>
  );
};
