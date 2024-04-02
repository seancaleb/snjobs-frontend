import {
  Breadcrumb as BreadcrumbMain,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BreadcrumbLinkItem = {
  label: string;
  path: string;
};

export const Breadcrumb = () => {
  const location = useLocation();
  const links: BreadcrumbLinkItem[] = [];

  location.pathname.split("/").reduce((prev, curr) => {
    if (curr === "") return "employer";

    if (curr === "employer") {
      links.push({
        label: "Dashboard",
        path: "/employer/dashboard",
      });

      return prev.concat(`/${curr}`);
    }

    if (_.findIndex(links, { label: _.capitalize(curr) }) !== -1) {
      return prev.concat(`/${curr}`);
    }

    const path = prev.concat(`/${curr}`);
    const label = _.capitalize(curr.replace(/-/g, " "));

    links.push({
      label,
      path,
    });

    return path;
  });

  let displayedLinks: (BreadcrumbLinkItem | null)[] = [];
  const maxDisplayedLinks = 2;

  if (links.length > maxDisplayedLinks) {
    displayedLinks.push(links[0]);
    displayedLinks.push(null);
    displayedLinks.push(...links.slice(-1));
  } else {
    displayedLinks = [...links];
  }

  return (
    <BreadcrumbMain>
      <BreadcrumbList className="text-xs">
        {displayedLinks.map((link, index) => (
          <Fragment key={`breadcrumb-${link}-${index}`}>
            {link ? (
              location.pathname === link.path ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{link.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={link.path}>{link.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )
            ) : (
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="icon" />
                    <BreadcrumbSeparator />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {links
                      .slice(
                        1,
                        location.pathname.split("/").length - maxDisplayedLinks
                      )
                      .map((link: BreadcrumbLinkItem, index) => (
                        <DropdownMenuItem
                          key={`breadcrumb-dropdown-${link}-${index}`}
                          asChild
                        >
                          <Link to={link.path}>{link.label}</Link>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbMain>
  );
};
