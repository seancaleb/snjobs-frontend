import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComponentProps, ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label?: string;
  placeholder?: string;
  TextareaProps?: ComponentProps<typeof Textarea>;
  children?: ReactNode;
};

export const TextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  TextareaProps,
  children,
}: TextareaFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Textarea
            {...field}
            className="resize-none"
            placeholder={placeholder}
            rows={8}
            {...TextareaProps}
          />
        </FormControl>
        {children}
        <FormMessage />
      </FormItem>
    )}
  />
);
