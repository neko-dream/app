import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { data } = await api.GET("/talksessions/{talkSessionId}/analysis", {
    headers: request.headers,
    params: {
      path: {
        talkSessionId: params.id || "",
      },
    },
  });

  const { data: opinions } = await api.GET(
    "/talksessions/{talkSessionID}/opinions",
    {
      headers: request.headers,
      params: {
        path: {
          talkSessionID: params.id || "",
        },
      },
    },
  );

  return defer({ data, opinions });
};