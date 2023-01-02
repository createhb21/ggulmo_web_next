import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import { isProduction } from "@/utils/assertion";

const pageView = (url: URL) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

const useGoogleAnalytics = () => {
  const router = useRouter();

  const handleRouteChange = (url: URL) => {
    if (!isProduction) return;
    pageView(url);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const GoogleAnalyticsScripts = useCallback(
    () => (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </>
    ),
    [],
  );

  return GoogleAnalyticsScripts;
};

export default useGoogleAnalytics;
