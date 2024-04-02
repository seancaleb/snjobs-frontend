/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { LoginFormValues, loginFormSchema } from "./schema";
import { Spinner } from "@/components/elements";
import { InputField, PasswordVisibilityToggle } from "@/components/form";
import { ContentLayout } from "@/components/layout";
import { useLogin } from "../../api/use-login";
import { cn } from "@/lib/utils";
import { useLoginUser } from "@/hooks/use-login-user";

export const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const { control, handleSubmit, formState } = form;
  const { isValid } = formState;
  const inputRef = useRef<HTMLInputElement>(null);
  const loginMutation = useLogin();
  const { handleLoginUser } = useLoginUser({ mutation: loginMutation });

  const onSubmit: SubmitHandler<LoginFormValues> = (credentials) => {
    if (isValid) {
      handleLoginUser(credentials);
    }
  };

  const handleTogglePasswordVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (loginMutation.isError) {
      inputRef.current?.focus();
    }
  }, [loginMutation.isError]);

  return (
    <ContentLayout
      variant="card"
      className="max-w-md w-full sm:p-8 border rounded-xl bg-card"
    >
      <Form {...form}>
        <form
          id="login-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          <InputField
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            InputProps={{
              disabled: loginMutation.isPending,
            }}
          />

          <InputField
            control={control}
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            label="Password"
            InputProps={{
              ref: inputRef,
              disabled: loginMutation.isPending,
            }}
          >
            <PasswordVisibilityToggle
              isVisible={isVisible}
              onToggle={handleTogglePasswordVisibility}
              CheckboxProps={{
                disabled: loginMutation.isPending,
              }}
            />
          </InputField>

          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending && <Spinner />}
            Sign in
          </Button>

          <div className="muted">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className={cn(
                "text-indigo-700",
                loginMutation.isPending && "pointer-events-none"
              )}
            >
              Sign up here.
            </Link>
          </div>
        </form>
      </Form>
    </ContentLayout>
  );
};
