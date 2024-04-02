import { z } from "zod";
import { userSchema } from "@/features/account";

export const parsedTokenSchema = z.object({
  ...userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    userId: true,
  }).shape,
  exp: z.number(),
});

export type ParsedToken = z.infer<typeof parsedTokenSchema>;
