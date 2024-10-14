import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { notfound } from "~/libs/notfound";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = await api
    .GET("/talksessions/{talkSessionID}/swipe_opinions", {
      headers: request.headers,
      params: {
        path: {
          talkSessionID: params.id || "",
        },
        query: {
          limit: 1,
        },
      },
    })
    .then((res) => res.data?.[0]);

  if (!data) {
    throw notfound();
  }

  return json({ data });
};
