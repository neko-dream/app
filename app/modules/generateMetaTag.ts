import { MetaFunction } from "@remix-run/cloudflare";

export const generateMetaTag = () => {
  const meta: MetaFunction = () => {
    return [
      {
        title: "ことひろ",
      },
      {
        description:
          "多種多様な意見や言葉を重ねてよりよい意思決定を目指すサービス",
      },
      {
        "og:url": "https://ogp-sample.pages.dev/ogp?title=ことひろ",
      },
    ];
  };

  return meta;
};
