import { ModeToggle } from "@/components/elements";
import { NavigationMenuClient } from "@/components/elements/navigation";
import { AppLogo } from "@/components/misc";

export const PlatformHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[4.125rem] bg-background z-40 border-b">
      <div className="h-full flex items-center justify-between gap-6 bg-background container">
        <AppLogo path="/jobs?page=1" />
        <div className="flex items-center gap-2 sm:gap-4">
          <NavigationMenuClient />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
