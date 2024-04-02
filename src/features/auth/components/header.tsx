import logoPath from "@/assets/images/logo.svg";

type AuthHeaderProps = {
  title: string;
  description: string;
};

export const Header = ({ title, description }: AuthHeaderProps) => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <img src={logoPath} className="h-7" />
        <span className="text-[#09090b] dark:text-foreground font-bold text-xl tracking-[-.015em]">
          SNJOBS
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2>{title}</h2>
        <div className="text-muted-foreground">{description}</div>
      </div>
    </>
  );
};
