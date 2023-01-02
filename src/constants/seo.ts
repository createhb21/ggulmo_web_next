import favicon from "public/favicon.ico";
import ogImage from "public/images/ogImage.png";

import type { SEOProps } from "@/components/seo/SEO";

export const TITLE_TEMPLATE = " | 꿀어모아";

export const DEFAULT_SEO_CONFIG: SEOProps = {
  title: "중고 사이트 꿀모",
  description:
    "중고 거래 검색 사이트 꿀모! 원하는 중고를 꿀모에서 한번에 찾을 수 있어요.",
  openGraph: {
    type: "website",
    url: "https://www.ggulmo.com/",
    images: [{ url: ogImage.src, alt: "boilerplate", width: 800, height: 400 }],
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0 minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover",
    },
    {
      httpEquiv: "x-ua-compatible",
      content: "IE=edge",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: favicon.src,
    },
  ],
};
