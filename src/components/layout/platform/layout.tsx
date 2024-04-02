import { ReactNode } from "react";
import { PlatformHeader } from ".";

type PlatformLayoutProps = {
  children: ReactNode;
};

export const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <div className="relative h-screen">
      <PlatformHeader />
      <main className="pt-[4.125rem] h-full">{children}</main>
    </div>
  );
};
