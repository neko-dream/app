import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await api.GET("/talksessions/{talkSessionId}/analysis", {
    params: {
      path: {
        talkSessionId: params.id || "",
      },
    },
  });

  return defer({ data });
};
