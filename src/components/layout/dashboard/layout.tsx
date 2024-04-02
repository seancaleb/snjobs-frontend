import { useMediaQuery } from "@mantine/hooks";
import { DashboardHeader } from "./header";
import { DashboardSidebar } from "./sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const matches = useMediaQuery("(min-width: 80em)");

  return (
    <div className="flex h-screen">
      {matches ? <DashboardSidebar /> : null}
      <div className="grid content-start fixed top-0 right-0 bottom-0 left-0 xl:left-[calc(16rem)]">
        <DashboardHeader />
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
