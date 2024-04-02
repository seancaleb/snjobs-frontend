import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { LoginCredentials, Token } from "../types";

type MutationFnParams = {
  credentials: LoginCredentials;
};

const loginUserRequest = async (
  credentials: LoginCredentials
): Promise<Token> => {
  return await axios.post("/auth/login", credentials);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ credentials }: MutationFnParams) =>
      loginUserRequest(credentials),
  });
};
