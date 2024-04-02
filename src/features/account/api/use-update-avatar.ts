import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { UpdateAvatarParams, UpdateAvatarResponse } from "../schema";
import { useAppStore } from "@/stores";
import { employerKeys, userKeys } from "@/lib/react-query";
import { disableInteractions } from "@/utils/disable-interactions";

type MutationFnParams = UpdateAvatarParams;

export const updateAvatar = async ({
  avatar,
}: UpdateAvatarParams): Promise<UpdateAvatarResponse> => {
  const formData = new FormData();

  formData.append("avatar", avatar);

  return await axios.post("/users/profile/upload", formData);
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const auth = useAppStore.use.auth();

  return useMutation({
    mutationFn: ({ avatar }: MutationFnParams) => updateAvatar({ avatar }),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          auth.role === "employer"
            ? employerKeys.profile(auth.userId!)
            : userKeys.profile(auth.userId!),
      });

      disableInteractions(false);
    },
  });
};
