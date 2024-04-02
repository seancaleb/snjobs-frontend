import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEV_URL, IS_DEVELOPMENT, URL } from "@/config";
import { ClipboardCopy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type ShareProfileButtonProps = {
  userId: string;
};

const BASE_URL = IS_DEVELOPMENT ? DEV_URL : URL;

export const ShareProfileButton = ({ userId }: ShareProfileButtonProps) => {
  const handleClickCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/users/info/${userId}`);
    toast.success("Link Copied", {
      description: "Profile link have been copied.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Share</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleClickCopyLink}>
          <ClipboardCopy className="icon-start" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/users/info/${userId}`} target="_blank">
            <ExternalLink className="icon-start" />
            Preview
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
