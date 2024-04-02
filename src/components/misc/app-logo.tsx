import { NavLink } from "react-router-dom";
import { Logo } from "../svg";

type AppLogoProps = {
  path?: string;
};

export const AppLogo = ({ path }: AppLogoProps) => {
  const logoEl = (
    <div className="flex items-center gap-3">
      <div className="h-7">
        <Logo />
      </div>
      <span className="text-[#09090b] dark:text-foreground font-bold text-xl tracking-[-.015em]">
        SNJOBS
      </span>
    </div>
  );

  if (path) {
    return (
      <NavLink
        to={path}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md cursor-pointer flex gap-3 items-center"
      >
        {logoEl}
      </NavLink>
    );
  }

  return logoEl;
};
