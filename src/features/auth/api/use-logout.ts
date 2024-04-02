import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const logoutRequest = async () => {
  return await axios.post("/auth/logout");
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
};
