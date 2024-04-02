import { ReactNode } from "react";
import { SessionExpiredDialog } from "./session-expired-dialog";
import { useAppStore } from "@/stores";
import { useAuthorizeClient } from "../hooks/use-authorize-client";
import { useQueryClient } from "@tanstack/react-query";
import { disableInteractions } from "@/utils/disable-interactions";

type AuthorizeClientProps = {
  children: ReactNode;
};

export const AuthorizeClient = ({ children }: AuthorizeClientProps) => {
  const logoutUser = useAppStore.use.logoutUser();
  const { isSet, isSessionExpired, handleSessionExpire } = useAuthorizeClient();
  const queryClient = useQueryClient();

  const handleSessionExpired = () => {
    handleSessionExpire();
    logoutUser();
    queryClient.removeQueries();
    disableInteractions(false);
  };

  return (
    <>
      <SessionExpiredDialog
        isTokenExpired={isSessionExpired}
        handleSessionExpired={handleSessionExpired}
      />
      {isSet && !isSessionExpired && children}
    </>
  );
};
