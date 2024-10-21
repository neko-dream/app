import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { notfound } from "~/libs/notfound";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const sessionID = params.id!;

  const { data, error } = await api.GET(
    "/talksessions/{talkSessionID}/swipe_opinions",
    {
      headers: request.headers,
      params: {
        path: {
          talkSessionID: sessionID!,
        },
        query: {
          limit: 3,
        },
      },
    },
  );

  if (!data || error) {
    throw notfound();
  }

  return json({ data });
};
