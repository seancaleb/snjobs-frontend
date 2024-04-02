import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/providers";
import { queryClient } from "@/lib/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import { IS_DEVELOPMENT } from "@/config";
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme
          baseColor={`hsl(var(--skeleton-base))`}
          highlightColor={`hsl(var(--skeleton-highlight))`}
        >
          <WrapBalancerProvider>
            {children}
            {IS_DEVELOPMENT && (
              <ReactQueryDevtools initialIsOpen={false} position="left" />
            )}
          </WrapBalancerProvider>
        </SkeletonTheme>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
