import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await api.GET(
    "/talksessions/{talkSessionID}/opinions/{opinionID}/replies",
    {
      params: {
        path: {
          talkSessionID: params.id!,
          opinionID: params.iid!,
        },
      },
    },
  );

  return json({ data });
};
