import { HeadersArgs } from "@remix-run/cloudflare";

/**
 * loader の戻り値をページの Cache-Control header にセットする
 */
export const headers = ({ loaderHeaders }: HeadersArgs) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
};
