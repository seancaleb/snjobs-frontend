import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import {
  UpdateProfileParams,
  User,
  Employer,
  userSchema,
  employerSchema,
  adminSchema,
  Admin,
} from "../schema";
import { employerKeys, userKeys } from "@/lib/react-query";
import { Role } from "../types";
import { disableInteractions } from "@/utils/disable-interactions";

type MutationFnParams = {
  updatedUser: UpdateProfileParams;
  role: Role;
};

export const updateProfile = async (
  updatedUser: UpdateProfileParams,
  role: Role
): Promise<User | Employer | Admin> => {
  const data = await axios.patch("/users/profile", updatedUser);

  switch (role) {
    case "user": {
      return userSchema.parse(data);
    }
    case "employer": {
      return employerSchema.parse(data);
    }
    default: {
      return adminSchema.parse(data);
    }
  }
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updatedUser, role }: MutationFnParams) =>
      updateProfile(updatedUser, role),
    onSettled: async (data, _, { role }) => {
      if (data) {
        const { userId } = data;

        switch (role) {
          case "employer":
            await queryClient.invalidateQueries({
              queryKey: employerKeys.profile(userId),
            });
            disableInteractions(false);
            break;
          case "user":
            await queryClient.invalidateQueries({
              queryKey: userKeys.profile(userId),
            });
            disableInteractions(false);
            break;
          default:
            disableInteractions(false);
            break;
        }
      }

      disableInteractions(false);
    },
  });
};
