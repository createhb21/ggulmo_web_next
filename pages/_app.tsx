import { useState, useEffect, ReactElement } from "react";
import type { NextComponentType } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { Global, ThemeProvider } from "@emotion/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { AuthProvider } from "@/context";
import { SEO } from "@/components";
import { queryClient } from "@/services";
import { DEFAULT_SEO_CONFIG } from "@/constants";
import { analytics } from "@/utils/analytics";
import { globalStyles, theme } from "@/styles";

NProgress.configure({ showSpinner: false });

const Toast = dynamic<{}>(() =>
  import("@/components").then((module) => module.Toast),
);

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const router = useRouter();

  const [client] = useState(queryClient);
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  useEffect(() => {
    analytics(
      window,
      document,
      "script",
      "dataLayer",
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    );
  });

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);

  return (
    <>
      <SEO {...DEFAULT_SEO_CONFIG} />
      <Global styles={globalStyles} />
      <RecoilRoot>
        <QueryClientProvider client={client}>
          <Hydrate state={pageProps.dehydratedState}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider theme={theme}>
              <AuthProvider>
                {getLayout(<Component {...pageProps} />)}
                <Toast />
              </AuthProvider>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
