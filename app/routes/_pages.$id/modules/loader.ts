import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { boundary } from "~/modules/boundary";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { data: session } = await api.GET("/talksessions/{talkSessionId}", {
    headers: request.headers,
    params: {
      path: {
        talkSessionId: params.talkSessionId || "",
      },
    },
  });

  if (!session) {
    throw boundary();
  }

  return json({ session });
};
