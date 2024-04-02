import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, employerKeys, userKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import {
  User,
  Employer,
  userSchema,
  employerSchema,
  adminSchema,
  Admin,
} from "../schema";
import { Role } from "@/types";

export const getProfile = async (
  role: Role
): Promise<User | Employer | Admin> => {
  const data = await axios.get("/users/profile");

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

type QueryFnType = typeof getProfile;

type UseGetProfileOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetProfile = ({ config }: UseGetProfileOptions = {}) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryFn: () => getProfile(auth.role!),
    enabled: !!auth.isAuthenticated,
    queryKey:
      auth.role! === "user"
        ? userKeys.profile(auth.userId!)
        : employerKeys.profile(auth.userId!),
  });
};
