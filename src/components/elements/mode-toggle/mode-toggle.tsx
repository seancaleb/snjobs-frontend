import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers";

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleClickChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="group"
      onClick={handleClickChangeTheme}
    >
      <Sun className="icon-btn h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:opacity-100" />
      <Moon className="icon-btn absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:opacity-100" />
    </Button>
  );
};
