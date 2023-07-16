import type { DefaultSeoProps } from "next-seo"

const config: DefaultSeoProps = {
  description: "Empowering Developers through Professional Videos and courses",
  defaultTitle: "Islam maboud (coderOne)",
  canonical: "https://coderOne.com",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ], // uses by social media like facebook or linked in
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coderOne.com",
    title: "Islam maboud (coderOne)",
    siteName: "coderOne",
    description:
      "Empowering Developers through Professional Videos and courses",
    images: [
      {
        url: "http://coderOne.com/og.png",
        alt: "coderOne",
        secureUrl: "https://coderOne.com/og.png",
      },
    ],
  },
  twitter: {
    handle: "@coderOne",
    site: "@coderOne",
    cardType: "summary_large_image",
  },
}

export default config
