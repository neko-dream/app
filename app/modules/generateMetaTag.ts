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
        property: "og:url",
        content: "https://ogp-sample.pages.dev/ogp?title=ことひろ",
      },
    ];
  };

  return meta;
};
