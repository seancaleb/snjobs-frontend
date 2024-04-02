import { z } from "zod";

export const userBaseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(["user", "employer", "admin"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  avatar: z.string().nullable(),
});

export const userSchema = z.object({
  ...userBaseSchema.shape,
  bookmark: z.string().array(),
  applications: z.string().array(),
});

export const employerSchema = userBaseSchema;
export const adminSchema = userBaseSchema;

export const updateProfileParamsSchema = userBaseSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export const deleteProfileParamsSchema = z.object({
  password: z.string(),
});

export const updatePasswordParamsSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export const updatedPasswordSchema = z.object({
  message: z.string(),
});

export const deleteProfileSchema = z.object({
  message: z.string(),
});

export const userProfileDetailsSchema = userBaseSchema.pick({
  firstName: true,
  lastName: true,
  role: true,
  avatar: true,
});

export const updateAvatarParamsSchema = z.object({
  avatar: z.instanceof(File),
});

export const updateAvatarSchema = z.object({
  message: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Employer = z.infer<typeof employerSchema>;
export type Admin = z.infer<typeof adminSchema>;
export type UpdateProfileParams = z.infer<typeof updateProfileParamsSchema>;
export type DeleteProfileParams = z.infer<typeof deleteProfileParamsSchema>;
export type UpdatePasswordParams = z.infer<typeof updatePasswordParamsSchema>;
export type DeleteProfileResponse = z.infer<typeof deleteProfileSchema>;
export type UpdatedPasswordResponse = z.infer<typeof updatedPasswordSchema>;
export type UserProfileDetailsResponse = z.infer<
  typeof userProfileDetailsSchema
>;
export type UpdateAvatarParams = z.infer<typeof updateAvatarParamsSchema>;
export type UpdateAvatarResponse = z.infer<typeof updateAvatarSchema>;
