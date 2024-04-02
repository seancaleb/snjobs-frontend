import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "../api/use-logout";
import { useLogoutUser } from "@/hooks/use-logout-user";

export const LogoutButton = () => {
  const logoutMutation = useLogout();
  const { handleLogoutUser } = useLogoutUser({ mutation: logoutMutation });

  return (
    <Button
      variant="ghost"
      className="justify-start text-muted-foreground hover:text-primary hover:dark:text-primary transition hover:bg-transparent"
      onClick={handleLogoutUser}
      disabled={logoutMutation.isPending}
    >
      <LogOut className="icon-start" />
      Logout
    </Button>
  );
};
