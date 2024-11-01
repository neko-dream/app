import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { notfound } from "~/libs/response";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { data: session } = await api.GET("/talksessions/{talkSessionId}", {
    headers: request.headers,
    params: {
      path: {
        talkSessionId: params.id || "",
      },
    },
  });

  const { data: user } = await api.GET("/auth/token/info", {
    headers: request.headers,
  });

  if (!session) {
    throw notfound();
  }

  return json({
    session,
    isOwner: user?.displayId === session.owner.displayID,
  });
};
