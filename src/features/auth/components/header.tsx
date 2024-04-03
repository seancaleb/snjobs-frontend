import { AppLogo } from "@/components/misc";

type AuthHeaderProps = {
  title: string;
  description: string;
};

export const Header = ({ title, description }: AuthHeaderProps) => {
  return (
    <>
      <AppLogo />
      <div className="text-center space-y-1">
        <h2>{title}</h2>
        <div className="text-muted-foreground">{description}</div>
      </div>
    </>
  );
};
