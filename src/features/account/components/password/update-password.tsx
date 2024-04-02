import { useState } from "react";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { UpdatePasswordForm } from "../password/form/update-password-form";

export const UpdatePassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseForm = () => setIsOpen(false);
  const handleOpenForm = () => setIsOpen(true);

  return (
    <div className="w-full flex-col sm:flex-row flex justify-between gap-4 sm:gap-6">
      <div className="space-y-1">
        <div className="text-base font-medium tracking-tight">
          Manage password
        </div>
        <div className="text-sm text-muted-foreground">
          Enter a new password to update your account's security.
        </div>
      </div>
      <Button onClick={handleOpenForm}>
        <KeyRound className="icon-start-btn" />
        Change password
      </Button>

      <UpdatePasswordForm handleCloseForm={handleCloseForm} isOpen={isOpen} />
    </div>
  );
};
