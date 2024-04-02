import { Breadcrumb, ModeToggle } from "@/components/elements";
import { NavigationMenuDashboard } from "@/components/elements/navigation";

export const DashboardHeader = () => {
  return (
    <div className="h-[4.125rem] sticky top-0 px-6 flex items-center text-sm bg-background z-50">
      <div className="flex w-full justify-between items-center gap-6">
        <Breadcrumb />

        <div className="flex gap-2 sm:gap-4 items-center">
          <NavigationMenuDashboard />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
