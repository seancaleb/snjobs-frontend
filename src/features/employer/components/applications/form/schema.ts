import { z } from "zod";
import { APPLICATION_STATUS } from "@/features/employer";

export const updateApplicationFormSchema = z.object({
  status: z.enum(APPLICATION_STATUS),
});

export type UpdateApplicationFormValues = z.infer<
  typeof updateApplicationFormSchema
>;
